import asyncio
from playwright.async_api import async_playwright

woolworths_domain = "https://www.woolworths.com.au"

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

            image_element = await product.query_selector('.roundel-image .product--tile-image a')
            if image_element:
                image_link = await image_element.get_attribute('href')
                image_link = woolworths_domain + image_link
            else:
                image_link = "N/A"


            page_details = {'name': name, 'price': price, 'link': woolworths_domain + link, 'image_link': image_link}

            print(f"Product: {name} - Price: {price} - Link: {woolworths_domain + link}", f"Image Link: {image_link}")

            product_details.append(page_details)

        except Exception as e:
            print(f"Error processing product: {e}")

    return product_details

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        await page.goto('https://www.woolworths.com.au/shop/browse/specials/prices-dropped')

        all_product_details = []

        while True:
            # Click the "In stock" button on the first page only
            if not all_product_details:
                await page.click('button:has-text("In stock")')
                await page.wait_for_selector('.product-tile-group')

            # Scrape current page
            product_details = await scrape_page(page)
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

        for detail in all_product_details:
            print(detail)

        await browser.close()

asyncio.run(main())
