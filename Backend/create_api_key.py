from rest_framework_api_key.models import APIKey

# Create an API key
api_key, key = APIKey.objects.create_key(name="nova-shop-api")
print("API Key Generated: SAVE THIS KEY SOMEWHERE SAFE!")
print("=" * 50)
print(key)
print("=" * 50)
print("You won't be able to see this key again!") 