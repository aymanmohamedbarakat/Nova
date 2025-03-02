# My Django API Documentation

## API Key Usage

- **Header Name**: `Authorization`
- **Header Value**: `Api-Key your_api_key`

### Example Requests

#### Using Postman
1. Go to the Headers tab.
2. Add a new header:
   - **Key**: `Authorization`
   - **Value**: `Api-Key your_api_key`

#### Using cURL
```bash
curl -X GET https://a135-197-48-18-3.ngrok-free.app/api/products/ \
-H "Authorization: Api-Key your_api_key"