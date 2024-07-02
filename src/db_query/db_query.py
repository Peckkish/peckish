from supabase import create_client, Client


def get_items_JSON():
    url = "https://hliuapvxcfvbhkwcovlx.supabase.co"
    api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsaXVhcHZ4Y2Z2Ymhrd2Nvdmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDM4MjQsImV4cCI6MjAzNTQ3OTgyNH0.hRwI-iuwS9ctZHuiyGsKUBnIXshngYI_u9mfUfITA_E"

    # Instantiate supabase
    supabase: Client = create_client(url, api_key)

    # Query all from ingredients
    response = supabase.table("ingredients").select("*").execute()

    if response.error:
        print(f"Error: {response.error.message}")
        return

    rows = response.data

    data = []

    # Build append functionality
    for row in rows:
        data.append([row['item_id'], row['item_name'], float(row['item_price']), row['item_link']])

    ingredients_list = [
        {
            'item_id': item_id,
            'name': name,
            'cost': cost,
            'item_link': item_link
        }
        for item_id, name, cost, item_link in data
    ]
    return ingredients_list
