# Number Classification API

This API takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Technology Stack

- Node.js
- Express.js
- Axios
- CORS

## API Specification

### Endpoint

**GET** `/api/classify-number?number=<number>`

### Response Format

#### Success (200 OK)

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Error Responses

**400 Bad Request**

```json
{
    "error": "Invalid number format"
}
```

**500 Internal Server Error**

```json
{
    "error": "An unexpected error occurred"
}
```

## Requirements

- Accepts GET requests with a number parameter.
- Returns JSON in the specified format.
- Accepts all valid integers as the only possible inputs.
- Provides appropriate HTTP status codes.
- Handles CORS (Cross-Origin Resource Sharing).

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd number-classification-api
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the server:
    ```sh
    npm start
    ```
   The API will be running on http://localhost:3000.

## Deployment

To deploy the API to a publicly accessible endpoint, you can use platforms like Heroku, Vercel, or AWS.

## Testing

Ensure you test the API thoroughly to meet all requirements and acceptance criteria.

## License

This project is licensed under the MIT License.
