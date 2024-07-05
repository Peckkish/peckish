import asyncio
from playwright.async_api import async_playwright
from transformers import pipeline
import csv

woolworths_domain = "https://www.woolworths.com.au"

classifier = pipeline('zero-shot-classification',
                      model='facebook/bart-large-mnli')

labels = ['groceries', 'ingredients', 'tools',
          'accessories', 'cleaning', 'medical']


def isfood(name):
    result = classifier(name, labels)

    if result['labels'][0] == 'Non-Food' or result['labels'][0] == "":
        return False

    return True


async def scrape_page(page):
    await page.wait_for_selector('.product-tile-group')

    # Extract product details
    products = await page.query_selector_all('.product-tile-group')

    product_details = []

    for product in products:
        try:
            name_element = await product.query_selector('.product-title-container .title a')
            if name_element:
                name = await name_element.inner_text()
                link = await name_element.get_attribute('href')
            else:
                continue  # Skip this product if the name is not found

            # Adjust the selector for the price based on the HTML structure
            price_element = await product.query_selector('.product-tile-price .primary')
            if price_element:
                price = await price_element.inner_text()
            else:
                price = "N/A"

            page_details = {
                'name': name, 'price': price[1:], 'link': woolworths_domain + link}

            print(page_details, f"is it food: {isfood(name)}")

            if isfood(name):

                product_details.append(page_details)

        except Exception as e:
            print(f"Error processing product: {e}")

    return product_details


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        await page.goto('https://www.woolworths.com.au/shop/browse/specials/prices-dropped')

        with open('product_details.csv', 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Name', 'Price', 'Link'])  # Writing headers

            all_product_details = []

            while True:
                # Click the "In stock" button on the first page only
                if not all_product_details:
                    await page.click('button:has-text("In stock")')
                    await page.wait_for_selector('.product-tile-group')

                # Scrape current page
                product_details = await scrape_page(page)

                for detail in product_details:
                    # Write to CSV file
                    writer.writerow(
                        [detail['name'], detail['price'], detail['link']])

                all_product_details.extend(product_details)

                # Check for the "Next" link and navigate to the next page
                next_button = await page.query_selector('a.paging-next')
                if next_button:
                    next_page_url = await next_button.get_attribute('href')
                    next_page_url = woolworths_domain + next_page_url
                    print(f"Scraping next page: {next_page_url}")
                    if next_page_url:
                        await page.goto(next_page_url)
                        await page.wait_for_load_state('networkidle')
                    else:
                        break
                else:
                    break

            await browser.close()

        return all_product_details

all_product_details = asyncio.run(main())
