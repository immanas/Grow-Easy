# 🛍️ GrowEasy: AI‑Driven Retail Optimization for Shopify Stores
🌟 GrowEasy – AI‑Powered Inventory &amp; Pricing Optimization for Shopify  Unlock smart retail management with real-time demand forecasting, automated insights, and a full serverless architecture—built entirely on AWS with SageMaker, Lambda, DynamoDB, and React.


## 🛍️ What is Shopify?


[Shopify](https://www.shopify.com) is a popular **e-commerce platform** that allows anyone to easily create and manage an online store.  shopify dashbord.png.png
It helps businesses sell products, track orders, manage inventory, and handle payments — all in one place.
Think of it like a **digital shopping mall** that gives store owners everything they need to run a business online, without writing code.

Here is my shopify patner developer account :


![GrowEasy](shopifydashbord.png)



### 🌐 Supported Platforms : 

GrowEasy is designed to integrate seamlessly with various e-commerce platforms that support inventory and product APIs. While Shopify is the primary integration, the platform is extensible to others as well:

- **Shopify** – Fully supported via webhooks and REST Admin API. Automates real-time inventory analysis and pricing recommendations.

- **WooCommerce** – Easily connect GrowEasy to WooCommerce stores using REST API to pull product and stock data for AI-driven forecasting.

- **BigCommerce** – Integration-ready through BigCommerce’s API for retail inventory optimization and smart pricing updates.

- **Magento (Adobe Commerce)** – Suitable for enterprise retailers looking to leverage machine learning for inventory and demand prediction at scale.


**✅ I choosed shopify here to complete my project**


## 🤔 Why GrowEasy? — Problem vs Solution
💢 What problems store owners face without GrowEasy

✅ How GrowEasy solves each problem

🏆 What benefits (advantages) users gain


| 💢 **Problem Without GrowEasy**                                       | ✅ **How GrowEasy Solves It**                                                      | 🏆 **Advantage for Store Owners**                             |
|----------------------------------------------------------------------|------------------------------------------------------------------------------------|---------------------------------------------------------------|
| ❌ Manual inventory planning                                          | 🧠 Uses LSTM-based forecasting to predict product demand                          | 📦 Avoids overstock/understock losses                         |
| ❌ No real-time data-driven insights                                  | 📊 Dashboard shows live trends, demand forecasts, and low-stock alerts            | ⚡ Fast, informed decision-making                             |
| ❌ Missed opportunities during peak demand                            | 🔔 SNS alerts store owners about high-demand products in advance                   | 💰 Maximizes sales by staying stocked                         |
| ❌ Static pricing that ignores demand                                 | 🔄 Integrates demand forecasting into pricing logic (future upgrade)               | 📈 Enables smart, dynamic pricing                             |
| ❌ Shopify analytics not optimized for future planning                | 📂 Stores product + order history in DynamoDB, makes it ML-ready                   | 🔍 Better long-term strategy with historical + forecasted data|
| ❌ High infrastructure cost for ML pipelines                          | ☁️ Fully serverless using AWS Lambda + SageMaker + EventBridge                    | 💸 Zero server maintenance, pay-as-you-go                     |
| ❌ No automation for restocking strategy                              | ⏰ Hourly ML pipeline auto-updates forecasts and recommendations                   | 🔄 Hands-free inventory management                           |
| ❌ Difficult for non-tech founders to understand backend logic        | 🧱 Modular dashboard + visual insights + alerting system                           | 👩‍💼 Accessible to non-technical business users               |



## 🚀 Full System Architecture 
GrowEasy transforms raw Shopify store data into **actionable insights** using a fully serverless, AI-driven AWS pipeline.
🧠 Built entirely using modern AI & cloud-native AWS technologies:

### 🔄 Pre-AWS Steps in GrowEasy Integration

| 🔢 Step | 📝 Description | 🔍 Why It Matters |
|--------|----------------|-------------------|
| **1️⃣ Create App using Shopify Partner Dashboard** | You create the GrowEasy app inside the Shopify Partner portal. This gives you app credentials (API Key/Secret), scopes, and the ability to install it on a store. | Required to define permissions like `read_products`, and to enable installation into merchant stores. |
| **2️⃣ Install the App in a Merchant’s Store** | The merchant (store owner) installs the GrowEasy app via a secure install link (OAuth or manual). | App is now authorized to access that specific store’s product and inventory data. |
| **3️⃣ Register Webhooks using Shopify Admin API** | After install, your app calls the Admin API to register webhook topics like `products/create` and `products/update`. | These webhooks let Shopify notify your app automatically when product data changes. |
| **4️⃣ Receive Webhook POST Requests (JSON Payload)** | Shopify sends a POST request (with product data) to your specified API endpoint whenever a registered event occurs. | Real-time product events (title, inventory, price, SKU, tags) are pushed out as JSON. |


### 🔄 1. Webhook Data Collection

| 🔧 Component                 | ⚙️ Technology                  | 🔍 Purpose                                                       |
|----------------------------|------------------------------|------------------------------------------------------------------|
| 🛒 Shopify Store           | Shopify Admin API + Webhooks | Captures real-time events like new orders, product updates       |
| 🌐 API Gateway             | Amazon API Gateway           | Secure entry point for Shopify Webhooks                         |
| ⚙️ Lambda Webhook Handler  | AWS Lambda                   | Parses webhook data and stores it in DynamoDB                   |
| 💾 Raw Data Storage        | DynamoDB (GrowEasyWebhookLogs)| Stores incoming order/product data for further analysis          |

**📷 Diagram: Webhook Flow**


![API Gateway Flow](./api_gateway_event.png)  
![DynamoDB Tables](./dynamodb_tables.png)

---

### ⏱️ 2. Scheduled ML Pipeline (AutoPipeline)

| 🔧 Component                  | ⚙️ Technology                | 🔍 Purpose                                                       |
|-----------------------------|-----------------------------|------------------------------------------------------------------|
| ⏰ Scheduler                | Amazon EventBridge          | Triggers ML job every hour                                      |
| 📁 Data Exporter Lambda     | AWS Lambda                  | Reads from DynamoDB and writes `products.csv` to S3              |
| 🧠 ML Forecasting           | Amazon SageMaker            | Trains & runs LSTM model on product demand                      |
| 📊 Forecast Storage         | DynamoDB (ProductAnalytics) | Saves forecast results per product                              |
| 📤 Notifications (Optional) | Amazon SNS                  | Sends alerts for low stock or demand spikes                     |


---

### 📈 3. Real-Time Dashboard

| 🔧 Component               | ⚙️ Technology                  | 🔍 Purpose                                                       |
|--------------------------|------------------------------|------------------------------------------------------------------|
| 🖥️ Frontend               | React + Tailwind CSS         | User-friendly interface to view forecasts and trends            |
| 📊 Charts                 | Recharts                     | Visualize product forecasts and sales trends                    |
| 🔗 API Layer              | AWS API Gateway + Lambda     | Fetches latest forecast data from DynamoDB                      |
| 🔒 Security + Tracing     | IAM, CloudWatch, X-Ray       | Role-based access control and monitoring/tracing                |

**📷 Screenshot: GrowEasy Dashboard UI**
This dashboard is built specifically for retail business owners and inventory managers to monitor forecasted demand, stock levels, and price recommendations in real-time. But, Now here ,
Dashboard fully developed and owned by me as part of the GrowEasy AI-powered retail platform. Responsible for architecture, design, data integration, and deployment.
🔗 [Live Dashboard Demo](https://your-demo-link.com) — You can explore the working example here.

![Dashbord view](./Dashbord.png)

## ⚙️You can add multiple store here in the seeting :


![Dashboard Settings](./dashbordseetings.png)

---

### 🛠️ DevOps & Monitoring

| 🔧 Component           | ⚙️ Technology                    | 🔍 Purpose                                      |
|----------------------|--------------------------------|------------------------------------------------|
| 🛡️ IAM               | AWS IAM Roles & Policies       | Secure, least-privilege access control         |
| 📊 Monitoring         | Amazon CloudWatch              | Tracks logs, metrics, invocations, errors      |
| 💥 DLQ                | Lambda DLQs                   | Stores failed events for debugging             |
| 🔎 X-Ray              | AWS X-Ray                      | Full trace of requests across services         |


**📷 Diagram: Monitoring & Logging via CloudWatch**  


![CloudWatch Logs](./cloudwatch_logs.png)







## 📊 Features
- Real-time data ingestion from DynamoDB to S3.
- Custom LSTM model training in SageMaker.
- Automated weekly forecasting with EventBridge.
- API endpoint for forecast access.
- Dashboard integration for monitoring.


## 🏆 Hackathon Experience: Codex 2.0  

I built **GrowEasy** during the **Codex 2.0 Hackathon** in just **36 hours**, working under extreme pressure with my team.  
- ✅ **Real-life problem solving** → tackled challenges faced by small Shopify merchants like stockouts and wrong pricing.  
- ✅ **Hands-on project building** → designed and implemented the end-to-end AI + cloud pipeline (Shopify → AWS → AI → Dashboard).  
- ✅ **Dynamic price prediction** → added AI-driven **real-time price recommendation engine** to maximize merchant revenue.  
- ✅ **Worked under time constraints** → completed full architecture, backend pipeline, AI forecasting, and dashboard in less than 2 days.  

This project was not just about coding, but about:  
- Thinking like a **cloud/DevOps engineer** under real-world conditions.  
- Delivering a **production-grade system** in limited time.  
- Learning how to handle **team collaboration, stress, and quick decision making** during a hackathon.  

---

### 📸 Hackathon Moments:  

Here are some snapshots from my **Codex 2.0 journey** while building GrowEasy:  


![CloudWatch Logs](hack.jpg)
![CloudWatch Logs](hack1.jpg)



Also, you can check from here: [LinkedIn](https://www.linkedin.com/in/me-m-gantait/)


✨ This experience made GrowEasy not just a project, but a **real proof of my skills in cloud, AI, and problem-solving under pressure.**




## 🙌 Contributions Welcome!

GrowEasy is an open-source initiative, and **we welcome contributions** from developers, data scientists, cloud engineers, and e-commerce enthusiasts!

### 💡 Ideas You Can Work On

| Feature Idea               | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| 💰 Dynamic Pricing         | Adjust product prices based on forecasted demand and stock levels          |
| 📉 Sales Anomaly Detection | Detect sudden drops/spikes in sales and alert store owners                 |
| 🏬 Multi-Store Support     | Enable GrowEasy to manage multiple Shopify stores under one dashboard       |
| 🔐 Role-Based Dashboard    | Add user authentication and access control for different team members      |
| 📈 Trend Analysis Charts   | Show seasonality and long-term performance trends for each product         |
| 📬 Email Reporting (SNS)   | Send daily/weekly summaries to store owners using Amazon SNS                |

---


### 🛠️ How to Contribute

1. 🍴 Fork the repo
2. 📦 Create a new feature branch: `git checkout -b feature-name`
3. ✅ Make your changes and test them
4. 📬 Submit a pull request describing your enhancement

 🤝 Let's Build This Together!
Made with 💚 by **Manas Gantait**  

                
