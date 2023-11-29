# Payment App

## API Endpoints

| HTTP Method | Endpoint                                  | Description            |
| ----------- | ----------------------------------------- | ---------------------- |
| POST        | `{{base_payment_url}}/api/v1/invoice`     | Create new Invoice     |
| GET         | `{{base_payment_url}}/api/v1/payment/pay?invoice_id=` | Pay Link               |

## Notes

- Replace `{{base_payment_url}}` with the actual base URL of the Payment App service.
- The endpoint for "Pay Link" requires an `invoice_id` query parameter.

## API Docs
https://crimson-meadow-438973.postman.co/workspace/PAT~5e4b20a9-a21e-48b8-8eef-baeb56a29ad7/collection/31372685-9e138045-410f-4f9b-9748-f4e193256740?action=share&creator=30701742&active-environment=30701742-3c17942c-d556-4a3c-b175-2402ac791441

## How to Use
1. Clone or fork this repository
```sh
https://github.com/NicholasLiem/IF4031_M1_Payment_App
```
2. Initialize .env file using the template given (.env.example and docker.env.example)
```sh
touch .env
touch docker.env
```
3. Run docker compose and build
```sh
docker-compose up --build
```