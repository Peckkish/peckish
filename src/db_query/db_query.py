from supabase import create_client, Client

url: str = "https://hliuapvxcfvbhkwcovlx.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsaXVhcHZ4Y2Z2Ymhrd2Nvdmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDM4MjQsImV4cCI6MjAzNTQ3OTgyNH0.hRwI-iuwS9ctZHuiyGsKUBnIXshngYI_u9mfUfITA_E"
supabase: Client = create_client(url, key)


def get_ingredients_JSON():
    response = supabase.table('ingredients').select(
        'name, price').limit(100).execute()
    if response.data:
        return response.data
    else:
        print(response.error)
        return []


def get_recipes_JSON():
    response = supabase.table('recipes_100').select(
        'title, ingredients, instructions').limit(10).execute()
    if response.data:
        return response.data
    else:
        print(response.error)
        return []
