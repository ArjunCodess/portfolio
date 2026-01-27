# ArjunCodess Projects Knowledge Base

> Auto-generated from GitHub API on Tue Jan 27 2026. Use this file to train the RAG model.

## Project: WebCrawlAI

**Description:** No description provided.

**Key Stats:** ⭐ 119 Stars | 🍴 23 Forks
**Tech Stack:** Python, HTML, JavaScript
**Live Demo:** https://webcrawlai.onrender.com/
**Repository:** https://github.com/ArjunCodess/WebCrawlAI
**Topics:** gemini, python, selenium, thordata

### README Content
```markdown
<h1 align="center">WebCrawlAI - AI-Powered Web Scraping Platform</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ArjunCodess/WebCrawlAI.svg)](https://github.com/ArjunCodess/WebCrawlAI/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ArjunCodess/WebCrawlAI.svg)](https://github.com/ArjunCodess/WebCrawlAI/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

</div>

---

<p align="center">
  AI-powered web scraping platform that leverages Gemini AI to extract specific information from websites — handles dynamic content, CAPTCHAs, and provides clean JSON output for easy integration.
</p>

---

## 🏆 Sponsors

### CyberYozh

<div align="center">
  <img src="assets/cyberyozh-banner.png" alt="CyberYozh Banner" width="100%"/>
</div>

<div align="center">

<table>
  <tr>
    <td align="center" width="200">
      <a href="https://app.cyberyozh.com/?utm_source=github&utm_medium=webcrawlai" target="_blank">
        <img src="assets/cyberyozh-logo.jpeg" alt="CyberYozh Logo" width="150" height="150"/>
      </a>
    </td>
    <td align="left" width="600">
      <strong>CyberYozh</strong> - Reliable SMS activation, residential proxies, and mobile proxies for multi-accounting.<br/><br/>
      We have gathered the best solutions for multi-accounting and automation in one place.
    </td>
  </tr>
</table>

</div>

---

### Thordata

<div align="center">
  <img src="assets/thordata-banner.png" alt="Thordata Banner" width="100%"/>
</div>

<div align="center">

<table>
  <tr>
    <td align="center" width="200">
      <a href="https://dashboard.thordata.com/register?invitation_code=0HSUJ23G" target="_blank">
        <img src="assets/thordata-logo.png" alt="Thordata Logo" width="150" height="150"/>
      </a>
    </td>
    <td align="left" width="600">
      <strong>Thordata</strong> - Easy access to web data at scale, perfect for AI.<br/><br/>
      A global network of 60M+ residential proxies with 99.7% availability, ensuring stable and reliable web data scraping to support AI, BI, and workflows.<br/><br/>
      <strong>🎁 Free Trial Available!</strong> Start with our free trial to experience reliable proxy infrastructure.<br/><br/>
      <strong>💰 Exclusive: Use code "THOR66" for 30% off your first purchase!</strong><br/>
      <strong>🔗 Register with invitation code "0HSUJ23G" or <a href="https://dashboard.thordata.com/register?invitation_code=0HSUJ23G" target="_blank">click here</a></strong>
    </td>
  </tr>
</table>

</div>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [API Documentation](#api_documentation)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

WebCrawlAI is an intelligent web scraping platform designed to help developers, researchers, and businesses extract specific information from websites with ease. The platform combines advanced web scraping capabilities with AI-powered data extraction to handle complex websites, dynamic content, and CAPTCHAs.

The platform features an AI-powered extraction engine that uses Google's Gemini AI model to precisely parse and extract requested information based on natural language prompts. Users can simply provide a URL and describe what data they need (e.g., "Extract all product names and prices") and receive clean, structured JSON output.

Built with modern web technologies, WebCrawlAI emphasizes reliability through robust error handling, retry mechanisms, and comprehensive monitoring. The platform is designed for both technical and non-technical users, providing a user-friendly web interface alongside a powerful API for integration into existing workflows.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- **Python** (v3.8 or higher)
- **pip** package manager
- **ThorData Residential Proxy** account (for web scraping)
- **Google Gemini API Key** (for AI-powered extraction)

### Installing

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArjunCodess/WebCrawlAI.git
   cd WebCrawlAI
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file and configure the required variables:

   ```env
   THORDATA_USERNAME="your_thordata_username"
   THORDATA_PASSWORD="your_thordata_password"
   THORDATA_PROXY_SERVER="your_thordata_proxy_server"
   GEMINI_API_KEY="your_google_gemini_api_key"
   ```

   **Note:** All environment variables are required. The application will raise an error if any ThorData proxy configuration is missing.

4. **Run the application**

   ```bash
   python main.py
   ```

The application will be available at `http://localhost:5000` (default Flask port).

## 🔧 Running the tests <a name = "tests"></a>

Currently, the project uses manual testing and user acceptance testing. Automated testing setup is planned for future releases.

### Manual Testing

1. **Development Testing**

   - Run the development server with `python main.py`
   - Test core features: web scraping, AI extraction, JSON output
   - Verify error handling and retry mechanisms

2. **Integration Testing**

   - Test with various website types (static, dynamic, with CAPTCHAs)
   - Verify AI extraction accuracy with different prompts
   - Test API endpoints and response formats

3. **User Journey Testing**
   - Complete web interface workflow
   - Test API integration
   - Verify output format and accuracy

## 🎈 Usage <a name="usage"></a>

### Core Features

1. **Web Scraping**

   - Handle static and dynamic websites
   - Bypass CAPTCHAs and anti-bot measures
   - Support for JavaScript-heavy sites

2. **AI-Powered Extraction**

   - Natural language prompts for data extraction
   - Precise parsing using Gemini AI
   - Structured JSON output

3. **Web Interface**

   - User-friendly interface for non-technical users
   - Real-time extraction results
   - Error handling and status updates

4. **API Integration**

   - RESTful API for programmatic access
   - Clean JSON responses
   - Easy integration into existing workflows

5. **Monitoring and Analytics**
   - Event tracking with GetAnalyzr
   - Performance monitoring
   - Usage analytics

### Getting Started Workflow

1. Access the web interface at the deployed URL
2. Enter the target website URL
3. Provide a clear extraction prompt (e.g., "Extract all product names and prices")
4. Click "Extract Information"
5. Review the structured JSON output

## 🚀 Deployment <a name = "deployment"></a>

The project is configured for deployment on Render with the following setup:

### Production Deployment

1. **Render Deployment**

   - Connect your repository to Render
   - Configure environment variables in Render dashboard
   - Deploy automatically on pushes to main branch

2. **Required Environment Variables**

   ```env
   THORDATA_USERNAME="your_thordata_username"
   THORDATA_PASSWORD="your_thordata_password"
   THORDATA_PROXY_SERVER="your_thordata_proxy_server"
   GEMINI_API_KEY="your_google_gemini_api_key"
   ```

3. **Service Configuration**

   - Configure as a Web Service on Render
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `python main.py`

4. **Monitoring and Error Tracking**

   - GetAnalyzr integration for event tracking
   - Built-in error handling and logging
   - Performance monitoring capabilities

### Additional Services

- **ThorData Residential Proxy**: For reliable web scraping with 60M+ residential proxies
- **Google Gemini AI**: For intelligent data extraction and parsing
- **GetAnalyzr**: For usage analytics and monitoring

## 📚 API Documentation <a name="api_documentation"></a>

**Endpoint:** `/scrape-and-parse`

**Method:** `POST`

**Request Body (JSON):**

```json
{
  "url": "https://www.example.com",
  "parse_description": "Extract all product names and prices"
}
```

**Response (JSON):**

**Success:**

```json
{
  "success": true,
  "result": {
    "products": [
      { "name": "Product A", "price": "$10" },
      { "name": "Product B", "price": "$20" }
    ]
  }
}
```

**Error:**

```json
{
  "error": "An error occurred during scraping or parsing"
}
```

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- [Flask](https://flask.palletsprojects.com/) - Web Framework (v3.0.0)
- [Python](https://www.python.org/) - Programming Language
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) - HTML/XML Parser (v4.12.2)

### Web Scraping & Automation

- [Requests](https://requests.readthedocs.io/) - HTTP Library for Python
- [Selenium](https://selenium-python.readthedocs.io/) - Browser Automation (v4.16.0)
- [lxml](https://lxml.de/) - Fast XML and HTML Processing
- [html5lib](https://html5lib.readthedocs.io/) - HTML Document Parser
- [ThorData Residential Proxy](https://thordata.com) - Global network of 60M+ residential proxies

### AI & Machine Learning

- [Google Generative AI](https://ai.google.dev/) - Gemini AI Integration (v0.3.1)
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI Integration Tools

### Frontend & UI

- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Axios](https://axios-http.com/) - HTTP Client Library
- [Marked](https://marked.js.org/) - Markdown Parser

### Development & Deployment

- [Render](https://render.com/) - Deployment Platform
- [python-dotenv](https://python-dotenv.readthedocs.io/) - Environment Variables (v1.0.0)
- [GetAnalyzr](https://getanalyzr.com/) - Analytics and Event Tracking

### Additional Libraries

- [Waitress](https://docs.pylonsproject.org/projects/waitress/) - WSGI Server

## ✍️ Authors <a name = "authors"></a>

- **ArjunCodess** (Arjun Vijay Prakash) - Project development and maintenance

_Note: This project embraces open-source values and transparency. We love open source because it keeps us accountable, fosters collaboration, and drives innovation. For collaboration opportunities or questions, please reach out through the appropriate channels._

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

### Sponsors

- **[CyberYozh](https://cyberyozh.com)** for providing reliable SMS activation and proxy solutions for multi-accounting and automation
- **[Thordata](https://thordata.com)** for powering our web scraping infrastructure with their global network of 60M+ residential proxies

### Technology Partners

- **Google** for providing the Gemini AI model that powers our intelligent extraction capabilities
- **ThorData** for reliable residential proxy infrastructure with 60M+ proxies
- **Render** for the excellent deployment platform
- **Flask Team** for the robust web framework
- **Selenium** for powerful browser automation capabilities
- **Open Source Community** for the countless libraries and tools that make modern web development possible

---

<div align="center">

**WebCrawlAI** - Transforming web data into structured insights

_Built with ❤️ for developers and data enthusiasts_

</div>

```

---

## Project: analyzr

**Description:** Instant analytics for your apps.

**Key Stats:** ⭐ 31 Stars | 🍴 3 Forks
**Tech Stack:** TypeScript, JavaScript, CSS
**Live Demo:** https://getanalyzr.vercel.app
**Repository:** https://github.com/ArjunCodess/analyzr
**Topics:** analytics, events, nextjs, shadcn-ui, supabase, tools

### README Content
```markdown
<div align="center">

# Analyzr 📊

![OG](./public/og.png)

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

### TL;DR 🚀
Analyzr is a free and open-source analytics tool that requires just one line of code to set up.

It comes with built-in Discord notifications and works seamlessly with any website, giving you all the analytics data you need to make informed decisions.

---

### 📑 Table of Contents
- [Why Did We Build This?](#-why-did-we-build-this)
- [Who Is This For?](#-who-is-this-for)
- [What Can It Do?](#-what-can-it-do)
- [How Does It Work?](#how-does-it-work)
- [Discord Integration](#-discord-integration)
- [What Makes It Different?](#-what-makes-it-different)
- [Want to Try It?](#-want-to-try-it)
- [Quick Links](#-quick-links)
- [Let's Chat!](#-lets-chat)
- [FAQ](#-frequently-asked-questions)

---

Hey there! 👋

Thanks for checking out Analyzr. It's a free tool that manages your website analytics and performance and offers many other features.

This project is an alternative to premium analytics services like Vercel Analytics.

With Analyzr, you can monitor everything from visitor activity to site performance without paying for it.

And the best part? It's **open-source** and **free for everyone**.

---

### 💡 Why Did We Build This?

Analyzr doesn't charge you for tracking custom events or monitoring performance, unlike other analytics tools.

You get all of this and more, totally free.

---

### 🎯 Who Is This For?

![Product 2](./public/product2.png)

Developers who want to track their side projects.

Small business owners watching their website traffic.

Anyone who wants simple analytics without paying $$$.

---

### 🚀 What Can It Do?

Here are some of the core features of Analyzr:

- **Real-Time Tracking:** See what's happening on your website as it happens.

- **Custom Event Tracking:** Track specific actions your visitors take (for example, clicks on certain buttons).
  
  Here's how to track custom events:

  Using JavaScript/Node.js:
  ```javascript
  const axios = require('axios');
  
  const API_KEY = "YOUR_API_KEY";
  const url = "https://getanalyzr.vercel.app/api/events";
  const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
  };
  
  const eventData = {
      name: "",        // required - event name
      domain: "",      // required - your website domain
      description: "", // required - event description
      emoji: "🔔",    // optional - emoji for Discord notification
      fields: [       // optional - additional fields for Discord notification
        {
          name: "Field Name",
          value: "Field Value", 
          inline: true // optional - display fields in same line
        }
      ]
  };
  
  const sendRequest = async () => {
      try {
        const response = await axios.post(url, eventData, { headers });
        console.log("Event sent successfully", response.data);
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
  };
  
  sendRequest();
  ```

  Using Python:
  ```python
  import requests
  
  API_KEY = "YOUR_API_KEY"
  url = "https://getanalyzr.vercel.app/api/events"
  headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {API_KEY}"
  }
  
  event_data = {
      "name": "",        # required - event name
      "domain": "",      # required - your website domain
      "description": "", # required - event description
      "emoji": "🔔",    # optional - emoji for Discord notification
      "fields": [       # optional - additional fields for Discord notification
        {
          "name": "Field Name",
          "value": "Field Value",
          "inline": True # optional - display fields in same line
        }
      ]
  }
  
  def send_request():
      try:
          response = requests.post(url, json=event_data, headers=headers)
          response.raise_for_status()
          print("Event sent successfully", response.json())
      except requests.exceptions.RequestException as error:
          print("Error:", error)
  
  send_request()
  ```

  Yes, it's that simple!

- **Performance Monitoring:** Monitor how fast your site loads (and find areas to improve with smart suggestions on what to optimize next).

- **Device & Browser Stats:** See what devices, browsers, and operating systems your visitors are using.

- **Location Tracking:** Understand where your visitors are coming from.

- **Discord Notifications:** Get live updates on events right in your Discord DM.

---

### How Does It Work?

![Diagram](./public/diagram.png)

Here's exactly how Analyzr works, with no secrets:

First, you add our tracking script to your website - it's just a simple piece of code that counts when people visit your pages and what they click on.

This information goes straight to Supabase (our database provider), which organizes all this data.

We store everything safely in Supabase's storage system.

When you log in to your dashboard, you'll see all this information displayed in charts and numbers.

And if you want, we can send updates about your website straight to your Discord - it's that straightforward!

You can look at our code on GitHub to see exactly how everything works.

---

### 🤖 Discord Integration

![Product 3](./public/product3.png)

Setting up Discord notifications is easy:

1. **Enable Developer Mode in Discord**
   - Open User Settings
   - Go to App Settings → Advanced
   - Enable Developer Mode

2. **Get Your Discord User ID**
   - Right-click your profile or username
   - Click "Copy User ID"

3. **Add it to Analyzr**
   - Go to /settings in your Analyzr dashboard
   - Paste your Discord User ID
   - Save the changes

Once set up, you'll get real-time notifications for:

- Website traffic spikes
- Performance alerts
- Custom event triggers
- Error notifications
- And more!

(as you set it.)

---

### 💪 What Makes It Different?

![Product 1](./public/product1.png)

1. **It's Free**
   - No "free trial" tricks
   - No "upgrade to see more data" stuff
   - Just free, forever!

2. **Super Easy to Use**
   - Add one line of code to your site
   - See your stats right away

3. **Discord Integration**
   - Real-time notifications
   - Custom alerts for important events
   - Manage everything from Discord

---

### 📦 Want to Try It?

It's super easy to get started:

1. **Add the Tracking Script (and other stuff if needed)**
   
   For Vanilla/React apps:
   ```html
   <script
     defer
     data-domain="your-website.com"
     src="https://getanalyzr.vercel.app/tracking-script.js"
   >
   </script>
   ```

   For Next.js apps:
   ```html
   <Script
     defer
     data-domain="your-website.com"
     src="https://getanalyzr.vercel.app/tracking-script.js"
   />
   ```

   Just add this to your main layout or index file, and you're good to go!

2. Deploy your app to production.

3. It's done!

After you are done, start seeing real analytics on your dashboard.

---

### 🌟 Quick Links

- **Try it out:** [getanalyzr.vercel.app](https://getanalyzr.vercel.app)
- **Get the code:** [GitHub](https://github.com/arjuncodess/analyzr)
- **Launch:** [Product Hunt](https://www.producthunt.com/posts/getanalyzr)

---

### 💬 Let's Chat!

Got questions? Ideas? Just want to say hi.

- Drop an issue on GitHub
- DM me on Discord or X (@ArjunCodess)

We love hearing from users! 

---

### 🎉 Thanks!

Thanks for checking out Analyzr! We hope it makes your life a bit easier.

Happy tracking! 📊

P.S. If you like it, maybe give us a star on GitHub and an upvote on Product Hunt. ⭐

---

### ❓ Frequently Asked Questions

1. **Is Analyzr really free?**
   - Yes! We're 100% free and open source
   - No hidden fees or premium features
   - You can even self-host it if you want

2. **Will this slow down my website?**
   - Nope! Our tracking script is tiny (< 6KB)
   - It loads asynchronously (won't block your page)
   - Uses edge functions for super-fast response times

3. **Is my data private and secure?**
   - Absolutely! We use Supabase for secure data storage
   - Your data is never sold or shared
   - You can delete your data anytime
   - We don't track personal user information

4. **Can I use this with any website?**
   - Yes! Works with:
     - Next.js
     - React
     - Vue
     - Plain HTML
     - etc.

5. **What's the difference between Analyzr and other analytics tools?**
   - Free custom event tracking (others charge for this)
   - Built-in Discord notifications
   - No complex setup needed
   - Privacy-focused approach
   - Completely open source
```

---

## Project: storyblok-mcp

**Description:** Connect AI tools to Storyblok instantly - use natural language to manage your CMS like magic.

**Key Stats:** ⭐ 8 Stars | 🍴 7 Forks
**Tech Stack:** JavaScript, TypeScript
**Repository:** https://github.com/ArjunCodess/storyblok-mcp

### README Content
```markdown
# Storyblok MCP Server

Connect AI tools to Storyblok instantly - use natural language to manage your CMS like magic.

## Demo

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e3f3ae2b-2774-406d-a952-8994b9618202" alt="Demo Image 1" width="300" /></td>
    <td><img src="https://github.com/user-attachments/assets/3d6b6a34-70eb-4c57-99b7-c81d091f47ff" alt="Demo Image 2" width="300" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/960ff18e-537a-4a82-89bc-0f5b0e56f68f" alt="Demo Image 3" width="300" /></td>
    <td><img src="https://github.com/user-attachments/assets/cae92c66-43c7-4b64-a08d-d868f50566b5" alt="Demo Image 4" width="300" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2ecffada-e5ea-4008-8070-c579e0d28b10" alt="Demo Image 5" width="300" /></td>
    <td><img src="https://github.com/user-attachments/assets/e49d6c52-a805-4044-91dc-e1ed6d19df68" alt="Demo Image 6" width="300" /></td>
  </tr>
</table>

---

## Table of Contents

- [Demo](#demo)
- [Why This Project?](#why-this-project)
- [What is Storyblok?](#what-is-storyblok)
- [What's an MCP Server?](#whats-an-mcp-server)
- [Challenges I Faced](#challenges-i-faced)
- [How to Set Up (For Contributors)](#how-to-set-up-for-contributors)
- [How to Use (For Users)](#how-to-use-for-users)
- [Tools](#tools)
- [How to Contribute](#how-to-contribute)
- [Useful Links](#useful-links)
- [Thanks](#thanks)
- [License](#license)

---

## Why This Project?

Built for the [Storyblok Headless CMS Challenge](https://dev.to/challenges/storyblok) on DEV.to.

The goal: push AI and Storyblok's power together, make something fresh and useful.

---

## What is Storyblok?

Storyblok is a powerful headless CMS. API-first. Easy for devs and content creators to work together.

It's modular, super flexible, and fits with any frontend or workflow you want.

---

## What's an MCP Server?

MCP = a protocol that connects AI, tools, and data.

The MCP server acts as a middleman, showing AI what it can do and what data it has.

This enables AI clients, such as Cursor or Claude Desktop, to interact with Storyblok through natural language and manage content smoothly.

---

## Challenges I Faced

* **Built for myself (lol):**
  Never made or installed an MCP before. Took way longer than I thought.

* **API stress:**
  Kept checking Storyblok's API docs again and again. Scared I'd miss something.

* **AI stuff pressure:**
  Trying to get AI features right without breaking things was a headache.

* **Security:**
  Had to make sure no sensitive info leaks while exposing Storyblok management.

* **Developer experience:**
  Made the server easy to run, extend, and plug into AI tools. No shortcuts.

---

## How to Set Up (For Contributors)

1. Clone the repo:

   ```sh
   git clone https://github.com/ArjunCodess/storyblok-mcp.git
   cd storyblok-mcp
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Run the server:

   ```sh
   pnpm start
   ```

---

## How to Use (For Users)

### Clone the repo:

   ```sh
   git clone https://github.com/ArjunCodess/storyblok-mcp.git
   cd storyblok-mcp
   ```

### Connect with Cursor

https://github.com/user-attachments/assets/98b77544-81c4-49b3-8dc2-14849e6ba7e5

- Open Cursor in the same directory.
- Right click on `build/index.js` file and click **Copy Path**.
- Now, go to **Settings** → **MCP Tools**.
- Click on **New MCP Server**
- Inside the opened `mcp.json` file. Paste this and replace PATH_YOU_COPIED with the path copied in the second step:
  ```json
  {
    "mcpServers": {
      "storyblok": {
        "command": "node PATH_YOU_COPIED",
        "env": {
          "STORYBLOK_SPACE_ID": "your_space_id",
          "STORYBLOK_MANAGEMENT_TOKEN": "your_management_token",
          "STORYBLOK_DEFAULT_PUBLIC_TOKEN": "your_public_token",
          "GOOGLE_GENERATIVE_AI_API_KEY": "your_gemini_ai_api_key"
        }
      }
    }
  }
  ```

---

## Tools

<details>
<summary>1. Story Management</summary>

- **fetch_stories**  
  Retrieve a list of stories (pages, folders, or content entries) from Storyblok. Supports filtering, pagination, and search.

- **get_story**  
  Fetch a single story by its ID.

- **create_story**  
  Create a new story (page, folder, or content entry) in Storyblok.

- **update_story**  
  Update an existing story's content, name, slug, or tags.

- **delete_story**  
  Delete a story by its ID.

- **publish_story**  
  Publish a story, making it live.

- **unpublish_story**  
  Unpublish a story, removing it from the live site.

- **get_story_versions**  
  Retrieve all previous versions of a story for version history and rollback.

- **restore_story**  
  Restore a story to a previous version.

- **import_story**  
  Import a story, optionally specifying language code and whether to import language settings.
</details>

<details>
<summary>2. Tag Management</summary>

- **fetch_tags**  
  List all tags used in the space.

- **create_tag**  
  Create a new tag.

- **create_tag_and_add_to_story**  
  Create a tag and immediately assign it to a story.

- **delete_tag**  
  Delete a tag by its ID.
</details>

<details>
<summary>3. Webhook Management</summary>

- **fetch_webhooks**  
  List all webhooks registered in the space.

- **get_webhook**  
  Fetch a single webhook by its ID.

- **create_webhook**  
  Create a new webhook that will trigger on specified Storyblok events.

- **update_webhook**  
  Update an existing webhook's endpoint, events, or other properties.

- **delete_webhook**  
  Delete a webhook by its ID.
</details>

<details>
<summary>4. Release Management</summary>

- **fetch_releases**  
  List all releases (content batches for scheduled publishing).

- **create_release**  
  Create a new release.

- **update_release**  
  Update an existing release's properties including name, release time and notification settings.

- **add_story_to_release**  
  Add a story to a release.

- **publish_release**  
  Publish all stories in a release.

- **delete_release**  
  Delete a release.
</details>

<details>
<summary>5. Presets Management</summary>

- **fetch_presets**  
  List all component presets in the space. Supports pagination.

- **get_preset**  
  Fetch a single preset by its ID.

- **create_preset**  
  Create a new preset with default values for a component.

- **update_preset**  
  Update an existing preset's content, name, or appearance settings.

- **delete_preset**  
  Delete a preset by its ID.
</details>

<details>
<summary>6. Story Scheduling</summary>

- **fetch_story_schedulings**  
  Retrieve a list of story scheduling objects (scheduled publishings) for stories. Supports filtering, pagination, and search.

- **get_story_scheduling**  
  Fetch a single story scheduling object by its ID.

- **create_story_scheduling**  
  Schedule a story to be published at a specific date and time.

- **update_story_scheduling**  
  Update an existing story scheduling (e.g., change publish time or language).

- **delete_story_scheduling**  
  Delete a story scheduling by its ID.
</details>

<details>
<summary>7. Access Management</summary>

- **fetch_access_tokens**  
  Retrieve all access tokens (API keys) for the current space.

- **get_access_token**  
  Fetch a single access token by its ID.

- **create_access_token**  
  Create a new access token (API key) for the space. Supports public/private, name, min_cache, story_ids, and branch_id.

- **update_access_token**  
  Update an existing access token's properties (type, name, min_cache, story_ids, branch_id).

- **delete_access_token**  
  Delete an access token by its ID.
</details>

<details>
<summary>8. Asset Management</summary>

- **fetch_assets**  
  List all assets (images, files, etc.) in the space.

- **get_asset**  
  Fetch a single asset by its ID.

- **delete_asset**  
  Delete an asset.

- **init_asset_upload**  
  Start uploading a new asset.

- **complete_asset_upload**  
  Complete the asset upload process.
</details>

<details>
<summary>9. Asset Folder Management</summary>

- **fetch_asset_folders**  
  List all asset folders.

- **create_asset_folder**  
  Create a new asset folder.

- **update_asset_folder**  
  Rename an asset folder.

- **delete_asset_folder**  
  Delete an asset folder.
</details>

<details>
<summary>10. Component Management</summary>

- **fetch_components**  
  List all components (content types) in the space.

- **get_component**  
  Fetch a single component by its ID.

- **create_component**  
  Create a new component.

- **update_component**  
  Update a component's schema or settings.

- **delete_component**  
  Delete a component.
</details>

<details>
<summary>11. Advanced Story Search</summary>

- **search_stories**  
  Search for stories using advanced filters (by slug, tag, etc.).

- **get_story_by_slug**  
  Fetch a story by its slug.
</details>

<details>
<summary>12. Folder Info</summary>

- **fetch_folders**  
  List all story folders.
</details>

<details>
<summary>13. Datasource Management</summary>

- **fetch_datasources**  
  List all datasources (for dynamic select fields, etc.).

- **get_datasource**  
  Get a single datasource by its ID.

- **create_datasource**  
  Create a new datasource with optional dimensions.

- **update_datasource**  
  Update an existing datasource (name, slug, dimensions).

- **delete_datasource**  
  Delete a datasource by its ID.
</details>

<details>
<summary>14. Datasource Entries Management</summary>

- **fetch_datasource_entries**  
  List all entries (key-value pairs) for a datasource.

- **get_datasource_entry**  
  Fetch a single datasource entry.

- **create_datasource_entry**  
  Create a new entry in a datasource with optional dimension values.

- **update_datasource_entry**  
  Update an existing datasource entry.

- **delete_datasource_entry**  
  Delete a datasource entry by its ID.
</details>

<details>
<summary>15. Utility</summary>

- **ping**  
  Check if the server and Storyblok API are reachable.
</details>

<details>
<summary>16. Component Folders Management</summary>

* **fetch_component_folders**  
  List all component folders in the space.

* **get_component_folder**  
  Fetch a single component folder by its ID.

* **create_component_folder**  
  Create a new component folder with optional parent ID.

* **update_component_folder**  
  Update an existing component folder's name or parent ID.

* **delete_component_folder**  
  Delete a component folder by its ID.
</details>

<details>
<summary>17. Space Roles Management</summary>

* **fetch_space_roles**  
  List all space roles in your Storyblok space.

* **get_space_role**  
  Fetch a single space role by its ID.

* **create_space_role**  
  Create a new space role with custom permissions settings.

* **update_space_role**  
  Update an existing space role's permissions and settings.

* **delete_space_role**  
  Delete a space role by its ID.
</details>

<details>
<summary>18. Space Management</summary>

* **fetch_spaces**  
  List all spaces accessible to your account. Supports pagination.

* **get_space**  
  Get information about the current Storyblok space.

* **create_space**  
  Create a new space with optional configuration for billing, environments, and custom options.

* **update_space**  
  Update an existing space's settings including name, domain, hooks, and configuration options.

* **delete_space**  
  Delete a space by its ID.

* **duplicate_space**  
  Create a copy of an existing space with options to duplicate content and components.

* **backup_space**  
  Trigger a backup for a space.
</details>

<details>
<summary>19. AI Tools</summary>

* **generate_alt_text**  
  Automatically create alt text for images based on content or context.

* **translate_story**  
  Translate the content of a story into different languages using AI.

* **generate_meta_tags**  
  Generate SEO-friendly meta titles and descriptions for any story.

* **summarize_story**  
  Get a brief AI-generated summary of a story's content.

* **tag_story_with_ai**  
  Auto-generate relevant tags for a story using natural language processing.
</details>

<details>
<summary>20. Workflow Management</summary>

- **fetch_workflows**  
  List all workflows in the space with optional pagination.

- **get_workflow**  
  Fetch a single workflow by its ID.

- **create_workflow**  
  Create a new workflow with name and associated content types.

- **update_workflow**  
  Update an existing workflow's name or content types.

- **duplicate_workflow**  
  Create a duplicate of an existing workflow with a new name and content types.

- **delete_workflow**  
  Delete a workflow by its ID.
</details>

<details>
<summary>21. Workflow Stage Management</summary>

- **fetch_workflow_stages**  
  List all workflow stages defined in the space.

- **get_workflow_stage**  
  Fetch a single workflow stage by its ID.

- **create_workflow_stage**  
  Create a new workflow stage with permissions and settings.

- **update_workflow_stage**  
  Update an existing workflow stage's permissions, name, color, or position.

- **delete_workflow_stage**  
  Delete a workflow stage by its ID.
</details>

<details>
<summary>22. Workflow Stage Changes Management</summary>

- **fetch_workflow_stage_changes**  
  List all workflow stage changes with option to filter by story ID.

- **get_workflow_stage_change**  
  Fetch a single workflow stage change by its ID.

- **create_workflow_stage_change**  
  Create a new workflow stage change by assigning a story to a specific workflow stage.
</details>

<details>
<summary>23. Pipelines (Branches) Management</summary>

- **fetch_branches**  
  List all pipeline branches in the space. Supports pagination.

- **get_branch**  
  Fetch a single branch by its ID.

- **create_branch**  
  Create a new branch with options for name, source branch, URL, and position.

- **update_branch**  
  Update an existing branch's properties like name, source, URL, or position.

- **delete_branch**  
  Delete a branch by its ID.

- **deploy_branch**  
  Manually trigger a deployment of a branch.

- **get_branch_stories**  
  List all stories within a specific branch. Supports filtering and pagination.

- **compare_branches**  
  Compare content between two branches to see differences.

- **copy_stories_between_branches**  
  Copy stories from one branch to another.
</details>

<details>
<summary>24. Branch Deployments Management</summary>

- **fetch_branch_deployments**  
  List all branch deployments in the space. Supports pagination.

- **create_branch_deployment**  
  Create a new branch deployment with required branch ID and optional release UUIDs. Requires the Pipelines application to be installed.

- **get_branch_deployment**  
  Fetch a single branch deployment by its ID.
</details>

---

## How to Contribute

Fork, make changes, open PRs.
Found bugs or want features? Open an issue.

---

## Useful Links

* [Storyblok Docs](https://www.storyblok.com/docs)
* [MCP Protocol](https://github.com/modelcontextprotocol)
* [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
* [DEV.to Challenge](https://dev.to/challenges/storyblok)

---

## Thanks

Made with ❤️ for the [DEV.to Storyblok Challenge](https://dev.to/challenges/storyblok).

---

## License

MIT
```

---

## Project: men2-predictor

**Description:** A machine learning pipeline for predicting Multiple Endocrine Neoplasia type 2 (MEN2) syndrome.

**Key Stats:** ⭐ 1 Stars | 🍴 0 Forks
**Tech Stack:** Python, TeX
**Live Demo:** https://huggingface.co/spaces/arjuncodess/men2-predictor
**Repository:** https://github.com/ArjunCodess/men2-predictor
**Topics:** disease-prediction, machine-learning, men2, pipeline, syndrome

### README Content
```markdown
# MEN2 Predictor: Rare Disease Machine Learning Pipeline

![Accuracy](https://img.shields.io/badge/Accuracy-97.20%25-brightgreen)
![Recall](https://img.shields.io/badge/Recall%20(Original)-100%25-success)
![Recall (Expanded)](https://img.shields.io/badge/Recall%20(Expanded)-96--98%25-informational)
![Models](https://img.shields.io/badge/Models-5-blue)
![Variants](https://img.shields.io/badge/RET%20Variants-24-blue)

**Can we save those 20k Rs people with just a simple blood test?**

In India, genetic testing for MEN2 costs INR 20,000 (~$225 USD), putting life-saving diagnosis out of reach for most families. This research asks: *can machine learning on routine blood biomarkers (calcitonin, CEA) and clinical features predict MTC risk without expensive genetic sequencing?*

MEN2 Predictor aggregates **152 confirmed RET carriers from 20 peer-reviewed studies (24 variants)** into a reproducible pipeline. On the real clinical data alone, we achieve **100% sensitivity** (74.19% accuracy with XGBoost) - catching every documented cancer case. The expanded synthetic-augmented models push accuracy to 97.20% while maintaining 96-98% recall, potentially offering a cost-effective screening alternative for resource-limited settings.

## Table of Contents
- [Awards & Recognition](#awards--recognition)
- [Key Findings](#key-findings)
- [About The Project](#about-the-project)
- [Clinical Performance](#clinical-performance)
- [Scientific Contribution](#scientific-contribution)
- [Data Sources](#data-sources)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Limitations](#limitations)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## Awards & Recognition

🏆 **INSEF Regional Fair (Online) 2025-26 — Bronze Prize**

This project was selected for the [INSEF Regional Fair (Online) 2025](https://sciencesociety.in/insef/Online_INSEF_Selection_2025.htm) and was awarded the **Bronze Prize** at the competition held from January 3-11, 2026.

📜 [View Results](https://insef.org/insef/INSEF_Regional_Fair_Online_2025_26_Results.htm)

### Team Certificates

| Arjun Vijay Prakash | Harnoor Kaur |
|:-------------------:|:------------:|
| ![Arjun's Certificate](assets/ArjunVijayPrakash_38.jpg) | ![Harnoor's Certificate](assets/HarnoorKaur_39.jpg) |
| 📄 [Certificate (PDF)](assets/ArjunVijayPrakash_38.pdf) | 📄 [Certificate (PDF)](assets/HarnoorKaur_39.pdf) |

---

## Key Findings

### Real-Patient Cohort (152 carriers across 20 studies)

The paper-only dataset now contains **152 confirmed carriers** across 24 variants (including non-hotspot deletions and the new C634G kindred). On this purely clinical cohort, **XGBoost and SVM achieve 100% recall** (74.19% and 64.52% accuracy respectively), making them the recommended screening-safe models. For triage, **LightGBM on expanded data achieves 97.20% accuracy** with 96.08% recall.

### Synthetic Augmentation Impact

Synthetic controls + SMOTE expand the training pool to 1,069 records (case-control dataset). The ctDNA cohort contributes 16 paired calcitonin/CEA observations. Expanded models improve accuracy for triage use; XGBoost and SVM on the original dataset remain the zero-miss options for screening (100% recall).

| Model                | Dataset      | Accuracy   | Precision  | Avg Precision   | Recall     | F1 Score  | ROC AUC  |
| ---------------------- | ------------ | ---------- | ---------- | --------------- | ---------- | ---------- | -------- |
| **Logistic Regression**| Original     | 70.97%     | 65.00%     | 88.18%          | 86.67%     | 74.29%     | 0.8667   |
| **Logistic Regression**| Expanded     | 79.44%     | 53.76%     | 95.42%          | 98.04%     | 69.44%     | 0.9824   |
| **Random Forest**      | Original     | 80.65%     | 73.68%     | 85.38%          | 93.33%     | 82.35%     | 0.8750   |
| **Random Forest**      | Expanded     | 93.46%     | 80.33%     | 97.42%          | 96.08%     | 87.50%     | 0.9871   |
| **LightGBM**           | Original     | 80.65%     | 76.47%     | 82.66%          | 86.67%     | 81.25%     | 0.8583   |
| **LightGBM**           | Expanded     | **97.20%** | **92.45%** | **98.21%**      | **96.08%** | **94.23%** | **0.9922** |
| **XGBoost**            | Original     | 74.19%     | 65.22%     | 81.63%          | **100%**   | 78.95%     | 0.8125   |
| **XGBoost**            | Expanded     | 87.38%     | 65.79%     | 97.58%          | 98.04%     | 78.74%     | 0.9894   |
| **SVM (Linear)**       | Original     | 64.52%     | 57.69%     | 89.78%          | **100%**   | 73.17%     | 0.9083   |
| **SVM (Linear)**       | Expanded     | 46.26%     | 30.49%     | 68.95%          | 98.04%     | 46.51%     | 0.8684   |

### Clinical Interpretation

- **Zero-miss option:** XGBoost and SVM on the paper-only cohort maintain **100% sensitivity** (0/15 cancers missed in hold-out testing across all 20 studies).
- **Highest accuracy:** LightGBM on expanded data achieves **97.20% accuracy** with 96.08% recall, ideal for triage workflows.
- **Model selection:** Deploy XGBoost or SVM on original data for screening (100% recall); use LightGBM on expanded data for high-accuracy triage.

### Statistical Tests on Recall Drops

- Permutation tests (10,000 shuffles) show **no statistically significant recall drop** for any model (`p = 1` for all models). Logistic and XGBoost drop 2.0 percentage points; Random Forest and LightGBM increase recall by 2.7 points; SVM remains flat.
- McNemar's test cannot be applied because the original and expanded test sets share no overlapping positive patients; all positives are unique to each cohort.
- Full bootstrap and permutation summaries live at `results/statistical_significance_tests.txt` (generated automatically when running both datasets together via `python main.py --m=all --d=both`; statistical tests run only in the both-datasets workflow).

### Why This Matters

**Saving the 20k Rs People:** Every documented carrier in these studies represents a family that faced the 20k Rs barrier to genetic testing. Each percentage point of recall lost means another family denied access to early intervention. Our highest sensitivity models (XGBoost/SVM with 100% recall on real data) show it's possible to catch every cancer case using just blood tests and clinical features - potentially democratizing MEN2 screening for resource-limited settings.

Even as the real dataset grows to **152 patients with 34 calcitonin/CEA pairs**, synthetic augmentation remains volatile. Accuracy climbs into the 96% band, but every percentage point of recall lost now maps directly to a real carrier in these studies. Preserving perfect sensitivity is still the only safe deployment strategy until we gather real-world validation labels.

### Learning Paradigm Coverage

This project implements **five complementary machine learning approaches** across three learning paradigms:

**Linear Models:**
- **Logistic Regression**: Baseline interpretability with coefficient-based feature importance

**Tree-Based Ensembles:**
- **Random Forest**: Bagging with uncertainty quantification via tree voting
- **XGBoost**: Gradient boosting with L1/L2 regularization
- **LightGBM**: Efficient gradient boosting with leaf-wise growth

**Kernel-Based Learning:**
- **Support Vector Machine (SVM)**: Maximum-margin classification with linear kernel optimized for small datasets

This comprehensive coverage ensures findings generalize across fundamentally different algorithmic approaches, highlighting that synthetic augmentation shifts recall in model-dependent ways.

### Calcitonin vs CEA Biomarker Coupling (Multi-study)

- Integrated **12 cohorts with paired calcitonin/CEA labs** yielding **34 observed pairs** (ctDNA + legacy MEN2 series plus new MEN2B/C634R/S891A additions).
- Pearson correlation now sits at **r = 0.243** with the expanded cohort, confirming that CEA still tracks calcitonin when labs are collected together but with larger variance.
- `create_datasets.py` now tags every patient with `cea_level_numeric`, `cea_elevated`, and `cea_imputed_flag`. Thirty-four observations seed the **MICE + Predictive Mean Matching** pipeline that fills the remaining **118 gaps** while re-using observed donor values.
- Full provenance is saved in `results/biomarker_ceaimputation_summary.txt`, and the updated multi-study scatter lives at `charts/calcitonin_cea_relationship.png`.

### CEA Imputation Validation Study

**Concern addressed:** Weak calcitonin-CEA correlation (r=0.24) may undermine imputation reliability.

**Key findings from `src/cea_validation_study.py`:**

| Analysis | Result |
|----------|--------|
| With vs Without CEA | LightGBM achieves **97.20% with CEA, 96.73% without** (-0.47% impact) |
| Imputation method robustness | Accuracy varies **<1%** across MICE, mean, median, zero imputation |
| Conclusion | CEA provides minimal predictive benefit; imputation quality has negligible impact |

**Imputation Method Comparison (LightGBM, Expanded Dataset):**

| Method | Accuracy | Recall | Δ vs MICE |
|--------|----------|--------|-----------|
| MICE+PMM (current) | **97.20%** | 96.08% | --- |
| Mean imputation | 96.73% | 96.08% | -0.47% |
| Median imputation | **97.20%** | 96.08% | 0.00% |
| Zero imputation | 96.26% | 96.08% | -0.93% |

**Why include CEA if it has minimal impact?** Calcitonin alone can be elevated in many non-MTC conditions (hypergastrinemia, kidney insufficiency, certain medications). Clinical guidelines recommend combined calcitonin-CEA assessment because CEA adds prognostic value for monitoring disease aggressiveness. See [detailed rationale](reports/cea_imputation_validation.md#clinical-rationale-for-including-cea-despite-minimal-predictive-impact).

Run the study: `python src/cea_validation_study.py --m=all --d=both`

## About The Project

**The 20k Rs Question:** In India, MEN2 genetic testing costs INR 19,000-20,000 (~$225 USD) - a prohibitive barrier that prevents families from accessing life-saving diagnosis. This research explores whether we can save those "20k Rs people" with just routine blood tests and clinical features, using machine learning to predict MTC risk without expensive genetic sequencing.

MEN2 (Multiple Endocrine Neoplasia type 2) is a rare hereditary cancer syndrome caused by RET gene mutations. This project developed machine learning models to predict MTC (medullary thyroid carcinoma) risk across **24 different RET variants** using clinical and genetic features from **152 confirmed carriers** across 20 peer-reviewed research studies.

**Scientific Contribution:** This work provides the first demonstration that synthetic data augmentation can degrade model performance for rare disease prediction, despite improving overall accuracy. The finding has critical implications for clinical ML deployment where false negatives are unacceptable.

## Clinical Performance

### Recommended Model for Screening

**XGBoost on the paper-only dataset** — Zero-miss option for safety-critical workflows.

| Metric                   | Value     |
| ------------------------ | --------- |
| **Accuracy**             | 74.19%    |
| **Recall (Sensitivity)** | **100%**  |
| **Precision**            | 65.22%    |
| **F1 Score**             | 78.95%    |
| **ROC AUC**              | 0.8125    |

### Recommended Model for Triage

**LightGBM on the expanded dataset** — Highest accuracy with strong recall.

| Metric                   | Value     |
| ------------------------ | --------- |
| **Accuracy**             | **97.20%**|
| **Recall (Sensitivity)** | 96.08%    |
| **Precision**            | 92.45%    |
| **F1 Score**             | 94.23%    |
| **ROC AUC**              | 0.9922    |

### Performance Comparison

| Model              | Dataset   | Accuracy   | Recall     | Use Case                        |
| ------------------ | --------- | ---------- | ---------- | ------------------------------- |
| **XGBoost**        | Original  | 74.19%     | **100%**   | Screening (zero missed cancers) |
| **LightGBM**       | Expanded  | **97.20%** | 96.08%     | Triage (highest accuracy)       |

> **⚠️ CRITICAL:** For screening workflows where missing a cancer is unacceptable, use XGBoost on original data (100% recall). For high-accuracy triage after initial screening, use LightGBM on expanded data (97.20% accuracy).

## Scientific Contribution

This project makes three critical contributions to medical machine learning:

### 1. First Demonstration of Synthetic Data Volatility in Rare Diseases

- Shows that SMOTE and rule-based synthetic controls shift recall by **0-2.7 percentage points** even after adding 23 new real patients.
- Demonstrates that higher accuracy (96.7% vs 70.9%) can mask recall variability (96-100% vs 100%).
- Provides evidence that synthetic augmentation must be validated with real patients before clinical deployment.

### 2. Methodological Framework for Rare Disease ML

- Systematic comparison: 5 models × 2 datasets = 10 configurations
- Emphasis on recall over accuracy for screening applications
- Validation on real held-out data, not synthetic test sets

### 3. Clinical Deployment Guidelines

- Recommends original dataset models for deployment (100% recall)
- Quantifies clinical risk: "missing even 1/50 cases" is more impactful than "79% accuracy"
- Provides template for rare disease ML with limited data

### Publication Status

**Ready for submission** to:

- Machine Learning for Healthcare (MLHC) - Primary target
- Scientific Reports (Nature) - Accepts negative results
- Journal of Biomedical Informatics - Clinical ML focus

**Estimated impact**: High. Negative results are under-published but critical for preventing clinical failures.

### Future Work

**Immediate (0-3 months)**:

- ✅ Add SHAP explainability to show models learned real biology, not artifacts
- ✅ Implement uncertainty quantification (bootstrap confidence intervals on all metrics)
- Create clinical decision support interface with deployment guidelines

**Short-term (3-6 months)**:

- Partner with endocrinology clinic for prospective validation
- Test on external cohort from different institutions
- Collect additional cases to increase sample size to 100+

**Long-term (6-12 months)**:

- Multi-center validation study
- Investigate why synthetic augmentation specifically degrades recall
- Explore transfer learning from general thyroid cancer datasets

## Data Sources

Clinical data extracted from twenty peer-reviewed research studies:

| Study No. | Citation & Year | Key Variant(s) / Description | Patients (n) |
|-----------|-----------------|------------------------------|--------------|
| 1 | JCEM Case Reports (2025) | RET K666N carriers | 4 |
| 2 | JCEM (2016) RET Exon 7 Deletion | E505_G506del carrier | 1 |
| 3 | Thyroid Journal (2016) | 8 K666N families | 24 |
| 4 | Eur. J. Endocrinol. (2006) | 10 variants | 46 |
| 5 | Laryngoscope (2021) MEN2A penetrance | RET K666N with calcitonin/CEA labs | 4 |
| 6 | JCEM (2018) Homozygous K666N | Homozygous/heterozygous K666N | 6 |
| 7 | Oncotarget (2015) RET S891A | RET S891A, FMTC/CA | 15 |
| 8 | AJCR (2022) | Calcitonin-negative V804M metastatic | 1 |
| 9 | JCEM (2022) ctDNA cohort | Sporadic MTC cases (ctDNA-pos) | 21 |
| 10 | Genes (2022) RET c.1901G>A | RET C634Y carriers | 2 |
| 11 | BMC Pediatr (2020) MEN2B | Pediatric RET M918T | 1 |
| 12 | Annales d'Endocrinologie (2015) | RET Y791F pheochromocytoma | 1 |
| 13 | Surgery Today (2014) RET S891A | Pheochromocytoma-first MEN2A | 2 |
| 14 | Annals of Medicine & Surgery (2025) | RET C634R MEN2A case | 2 |
| 15 | Case Reports in Medicine (2012) | MEN2B (RET M918T) | 1 |
| 16 | Case Reports in Endocrinology (2020) | RET exon 11 delins | 1 |
| 17 | Clinics and Practice (2024) | RET C634G kindred | 6 |
| 18 | Endocrinol. Diabetes Metab. Case Reports (2024) | RET K666N family | 4 |
| 19 | Indian Journal of Cancer (2021) | RET S891A family | 7 |
| 20 | World Journal of Clinical Cases (2024) | RET C634Y family | 3 |

**Multi-Variant Dataset:** 152 confirmed RET germline mutation carriers across 24 variants (K666N, L790F, Y791F, V804M, S891A, R525W, M918T, E505_G506del, C634R, C634Y, C634W, C634S, C634G, C618S, C630R, C630G, C620Y, C620W, A883F, E632_C634del, E632_L633del, D898_E901del, V899_E902del, D631_L633delinsE) with ATA risk stratification.

**Key Feature:** Dataset spans calcitonin-negative FMTC, pediatric MEN2B, ctDNA-positive metastatic disease, and presymptomatic carriers, enabling cross-paradigm learning with paired calcitonin/CEA labs in twelve cohorts.

<details>
<summary><b>Detailed Study Information</b></summary>

1. **Study 1 - JCEM Case Reports (2025)**
   - Medullary thyroid carcinoma outcomes in heterozygous RET K666N carriers.

2. **Study 2 - JCEM (2016) RET Exon 7 Deletion**
   - First MEN2A case with the E505_G506del in-frame deletion (pheochromocytoma-first timeline, micro-MTC at age 37).

3. **Study 3 - Thyroid Journal (2016)**
   - Eight RET K666N families with MTC penetrance profiling.

4. **Study 4 - European Journal of Endocrinology (2006)**
   - Prospective prophylactic thyroidectomy outcomes in 46 gene carriers across 10 variants.

5. **Study 5 - Laryngoscope (2021) MEN2A penetrance**
   - Serial calcitonin + CEA monitoring of RET K666N carriers to quantify penetrance.

6. **Study 6 - JCEM (2018) Homozygous RET K666N**
   - First documented homozygous K666N case with metastatic disease and bilateral pheochromocytomas.

7. **Study 7 - Oncotarget (2015) RET S891A FMTC/CA**
   - Four-generation pedigree linking RET S891A + OSMR G513D to FMTC with cutaneous amyloidosis.

8. **Study 8 - AJCR (2022) Calcitonin-negative V804M**
   - Imaging and immunohistochemistry guided total thyroidectomy when serum markers were falsely negative.

9. **Study 9 - JCEM (2022) ctDNA cohort**
   - 21-patient prospective ctDNA study with matched calcitonin/CEA, tissue sequencing, and TKI status.

10. **Study 10 - Genes (2022) RET c.1901G>A family**
    - Familial MEN2A with RET C634Y and a novel SLC12A3 frameshift causing early bilateral pheochromocytomas.

11. **Study 11 - BMC Pediatrics (2020) MEN2B**
    - Pediatric RET M918T case linking severe constipation, Hirschsprung disease, and MEN2B progression.

12. **Study 12 - Annales d'Endocrinologie (2015) RET Y791F**
    - Questioning Y791F pathogenicity via pheochromocytoma presentation with normal calcitonin and refused thyroidectomy.

13. **Study 13 - Surgery Today (2014) RET S891A**
    - Pheochromocytoma-first MEN2A presentation plus presymptomatic RET-positive son with normal ultrasound/calcitonin.

14. **Study 14 - Annals of Medicine & Surgery (2025) RET C634R**
    - MEN2A case report with persistent biochemical disease and a RET-positive child carrier.

15. **Study 15 - Case Reports in Medicine (2012) MEN2B**
    - RET M918T MEN2B case with metastatic MTC and gastrointestinal ganglioneuromatosis.

16. **Study 16 - Case Reports in Endocrinology (2020) RET delins**
    - Novel exon 11 deletion (Asp631_Leu633delinsGlu) with MEN2A/B features and hyperparathyroidism.

17. **Study 17 - Clinics and Practice (2024) RET C634G**
    - Single-family MEN2 kindred with cutaneous lichen amyloidosis and RET C634G carriers.

18. **Study 18 - Endocrinol. Diabetes Metab. Case Reports (2024) RET K666N**
    - Familial MEN2 phenotype in K666N carriers with PHEO and micro-MTC.

19. **Study 19 - Indian Journal of Cancer (2021) RET S891A**
    - FMTC kindred with multiple S891A carriers and postoperative monitoring.

20. **Study 20 - World Journal of Clinical Cases (2024) RET C634Y**
    - MEN2A family case report with C634Y carriers across two generations.


</details>


### Dataset Characteristics

**Multi-Variant Dataset:** 152 confirmed RET germline mutation carriers spanning 20 cohorts

- **Studies 1-3 (RET K666N families + exon 7 deletion):** 29 patients.
- **Study 4 (European Journal 2006):** 46 prophylactic thyroidectomy cases across 10 variants.
- **Study 5 (Laryngoscope MEN2A):** 4 RET K666N relatives with serial calcitonin/CEA.
- **Study 6 (JCEM Homozygous K666N):** 6 family members (one homozygote).
- **Study 7 (Oncotarget S891A FMTC/CA):** 15 four-generation carriers.
- **Study 8 (AJCR Calcitonin-negative V804M):** 1 metastatic case.
- **Study 9 (JCEM ctDNA):** 21 sporadic MTC cases with pre/post biomarkers.
- **Study 10 (Genes RET c.1901G>A):** 2 RET C634Y/SLC12A3 carriers.
- **Study 11 (BMC Pediatrics MEN2B):** 1 pediatric RET M918T patient.
- **Study 12 (Annales RET Y791F Pheo):** 1 pheochromocytoma with normal calcitonin.
- **Study 13 (Surgery Today RET S891A):** 2 pheochromocytoma-first MEN2A carriers.
- **Study 14 (Annals of Medicine & Surgery C634R):** 2 MEN2A carriers.
- **Study 15 (Case Reports in Medicine MEN2B):** 1 RET M918T case.
- **Study 16 (Case Reports in Endocrinology delins):** 1 RET exon 11 deletion case.
- **Study 17 (Clinics and Practice C634G):** 6 RET C634G carriers.
- **Study 18 (EDM Case Reports K666N):** 4 RET K666N carriers.
- **Study 19 (Indian Journal of Cancer S891A):** 7 RET S891A carriers.
- **Study 20 (World Journal of Clinical Cases C634Y):** 3 RET C634Y carriers.
- **Age range:** 1-90 years.
- **Gender distribution (F/M):** 107/45.
- **RET Variants Included:** 24 total (K666N, L790F, Y791F, V804M, S891A, R525W, M918T, E505_G506del, A883F, C618S, C620Y, C620W, C630R, C630G, C634R, C634Y, C634W, C634S, C634G, E632_C634del, E632_L633del, D898_E901del, V899_E902del, D631_L633delinsE).

**ATA Risk Level Distribution:**

- **Level 1 (Moderate):** K666N, L790F, Y791F, V804M, S891A, R525W, E505_G506del.
- **Level 2 (High):** C618S, C630R, C630G, C620Y, C620W, D898_E901del, V899_E902del.
- **Level 3 (Highest):** C634R, C634Y, C634W, C634S, C634G, M918T, A883F, E632_C634del, E632_L633del, D631_L633delinsE.

**Clinical Outcomes:**

- MTC diagnosis now documented in **72/152 (47.4%)** real patients.
- C-cell disease (MTC + C-cell hyperplasia) observed in **76/152 (50.0%)** across all risk levels.
- Pheochromocytoma captured in 14 real patients (plus presymptomatic carriers) enabling MEN2A/MEN2B phenotyping.
- Hyperparathyroidism captured in 6 real patients across multiple risk tiers.

**Expanded Dataset:** Original 152 patients + synthetic variant-matched controls (1,069 rows total)

- Includes literature-based synthetic cases with variant-specific distributions.
- SMOTE augmentation applied inside the training loop for class balance.
- Enhanced feature space retains `cea_level_numeric`, `cea_elevated`, and imputation provenance for every record.

### Clinical Features

The dataset includes the following structured clinical and genetic features:

**Demographic Features:**

- `age`: Age at clinical evaluation (years)
- `gender`: Biological sex (0=Female, 1=Male)
- `age_group`: Categorized age ranges (young/middle/elderly/very_elderly)

**Genetic Features:**

- `ret_variant`: Specific RET variant (K666N, C634R, C634Y, L790F, E505_G506del, etc.)
- `ret_risk_level`: ATA risk stratification (1=Moderate, 2=High, 3=Highest)

**Biomarker Features:**

- `calcitonin_elevated`: Binary indicator of elevated calcitonin levels
- `calcitonin_level_numeric`: Numeric calcitonin measurement (pg/mL)

**Clinical Presentation Features:**

- `thyroid_nodules_present`: Presence of thyroid nodules on ultrasound
- `multiple_nodules`: Presence of multiple thyroid nodules
- `family_history_mtc`: Family history of medullary thyroid carcinoma

**Target Variables:**

- `mtc_diagnosis`: Primary target - confirmed MTC diagnosis (0=No, 1=Yes)
- `c_cell_disease`: Broader target including C-cell hyperplasia
- `men2_syndrome`: Full MEN2 syndrome features (rare in K666N carriers)
- `pheochromocytoma`: Presence of pheochromocytoma
- `hyperparathyroidism`: Presence of hyperparathyroidism

### Dataset Organization

The raw clinical data is stored in the [`data/raw`](data/raw) folder as structured json files:

- **[study_1.json](data/raw/study_1.json) ... [study_20.json](data/raw/study_20.json)**: Individual study extracts covering 20 included cohorts (see Data Sources table)
- **[literature_data.json](data/raw/literature_data.json)**: Aggregated statistics and meta-data
- **[mutation_characteristics.json](data/raw/mutation_characteristics.json)**: RET variant characteristics

This modular structure allows for:

- Easy data maintenance and updates
- Clear separation of concerns between raw data and processing logic
- Version control of individual study datasets
- Simple addition of new studies as they become available

### Data Processing Pipeline

The [create_datasets.py](src/create_datasets.py) script:

1. Loads patient data from JSON files in the [`data/raw`](data/raw) folder (20 studies)
2. Extracts and combines data from multiple research studies (152 patients, 24 variants across 20 sources)
3. Maps each variant to ATA risk level (1=Moderate, 2=High, 3=Highest)
4. Converts qualitative measurements to structured numeric features
5. Handles multiple reference ranges for calcitonin levels across studies
6. Engineers derived features (age groups, nodule presence, variant-specific interactions)
7. Generates two datasets:
   - `data/processed/ret_multivariant_training_data.csv`: Original 152 patients from literature
   - `data/processed/ret_multivariant_expanded_training_data.csv`: Expanded with synthetic controls
   - `data/processed/ret_multivariant_case_control_dataset.csv`: Further expanded with variant-matched controls

### Important Notes on Data Quality

- **Multi-Variant Dataset:** Includes 24 different RET variants with varying penetrance and risk profiles
- **Risk Stratification:** Variants classified by ATA guidelines (Level 1/2/3)
- **Incomplete Penetrance:** Not all carriers develop MTC; penetrance varies by variant
- **Variable Follow-up:** Some carriers elected surveillance over prophylactic surgery
- **Age-Dependent Risk:** Penetrance increases with age, reflected in age-stratified features
- **Variant-Specific Patterns:** High-risk variants (C634\*) show different clinical patterns than moderate-risk (K666N, L790F)
- **Study Heterogeneity:** Different studies used different calcitonin reference ranges and screening protocols

**Key features:**

- **End-to-end pipeline** managed by `main.py`, coordinating all major steps automatically.
- **Multiple ML algorithms:** Support for Logistic Regression, Random Forest, XGBoost, LightGBM, and SVM models.
- **Comprehensive model comparison:** Automatically generates detailed comparison of all 5 models on the same test set with complete patient data, showing which patients each model got right/wrong.
- **Model comparison mode:** Run all models simultaneously and compare performance metrics in a formatted table.
- **Dataset comparison mode:** Compare model performance on expanded dataset (with SMOTE and control cases) vs original paper data.
- **Automated data creation and expansion:** Scripts extract and structure relevant research data, and generate synthetic control samples to augment the dataset for robust modeling.
- **Comprehensive statistical analysis:** Automatic generation of descriptive statistics and visualization of the dataset for informed modeling.
- **Advanced model development:** Cross-validation and adaptive SMOTE balancing to handle class imbalance across all model types.
- **Clinical risk stratification:** 4-tier risk assessment (Low/Moderate/High/Very High) for actionable clinical decision-making.
- **Artifacts generated:** Processed datasets, trained model files, ROC curves, confusion matrices, and confidence interval summaries for clinically transparent scoring.

**Pipeline steps (as run by `main.py`):**

1. **create_datasets.py:** loads all study JSON files (now including Study 5 biomarker panels), computes the calcitonin vs CEA correlation, runs MICE + predictive mean matching to populate `cea_*` features, and emits the processed CSVs.
2. **data_analysis.py:** Computes descriptive statistics, generates variant-specific visualizations and risk-stratified analyses.
3. **data_expansion.py:** Produces variant-matched synthetic control samples to improve model balance.
4. **train_model.py:** Trains models with variant features, cross-validation, SMOTE balancing, and threshold optimization.
5. **test_model.py:** Evaluates the model on test data with variant-specific risk stratification, comprehensive metrics, and automatic comparison of all 5 models with complete patient data.
6. **calculate_ci.py:** Calculates 95% bootstrap confidence intervals for all performance metrics (automatically runs for all models).
7. **Artifact summary:** Includes `ret_multivariant_training_data.csv`, `ret_multivariant_expanded_training_data.csv`, `ret_multivariant_case_control_dataset.csv`, `model.pkl`, `model_comparison_detailed_results.txt`, and confidence interval reports.

**Advanced features:**

- **Automated Model Comparison:** Every test run generates comprehensive comparison of all 5 models with complete patient data, enabling pattern identification and clinical validation
- **Data Leakage Prevention:** SMOTE applied after train/test split to ensure realistic evaluation
- **Feature Engineering:** Polynomial features (age²) and interactions (calcitonin×age, risk×age, nodule_severity)
- **Variant-Aware Modeling:** One-hot encoding of 24 RET variants + risk level stratification
- **Constant Feature Removal:** Automatic detection and removal of non-informative features
- **Risk Stratification:** 4-tier system for clinical decision support instead of binary classification
- **Comprehensive Metrics:** ROC-AUC, F1-Score, Average Precision Score, ROC curves, confusion matrices, and automatic 95% bootstrap confidence intervals
- **Patient-Level Transparency:** See exactly which patients each model predicted correctly/incorrectly with full clinical context

**Typical features used:**

- Age at diagnosis/intervention and derived features
- **RET variant type** (K666N, C634R, C634Y, L790F, etc.) - one-hot encoded
- **ATA risk level** (1=Moderate, 2=High, 3=Highest) - ordinal feature
- Calcitonin levels and elevation status
- Thyroid nodule characteristics
- Family history of MTC
- Clinical markers (pheochromocytoma, hyperparathyroidism)
- **Variant-specific interactions** (risk×calcitonin, risk×age)

**Clinical Use Case:**

- **Screening Tool:** Optimized for high sensitivity (catches all MTC cases)
- **Risk Stratification:** Provides actionable monitoring recommendations
- **Research Tool:** Validated on small datasets typical of rare genetic conditions

</details>

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ArjunCodess/men2-predictor.git
   cd men2-predictor
   ```

2. Create and activate virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: ./venv/Scripts/activate
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

### Project Structure

- data/processed/ (processed CSVs)
  - ret_multivariant_training_data.csv - Original 152 patients
  - ret_multivariant_expanded_training_data.csv - Expanded with synthetic controls
  - ret_multivariant_case_control_dataset.csv - Additional control augmentation
- data/raw/ (study JSON files)
  - study_1.json ... study_7.json
  - literature_data.json
  - mutation_characteristics.json
- models/ - reusable model classes (base_model.py, random_forest_model.py, lightgbm_model.py, xgboost_model.py, logistic_regression_model.py)
- results/ - metrics, logs, ROC/confusion charts, biomarker summaries
- src/ - pipeline scripts (create_datasets.py, data_analysis.py, data_expansion.py, train_model.py, test_model.py)
- main.py - orchestrates dataset creation, analysis, training, testing
- requirements.txt - Python dependencies

## Usage

### Basic Usage

Run the complete pipeline:

```sh
python main.py
```

This executes all stages: data preparation, analysis, expansion, training, and testing.

### Model Selection (`--m`)

Choose which model to train:

- `l` or `logistic`: Logistic Regression (baseline)
- `r` or `random_forest`: Random Forest (research comparison)
- `x` or `xgboost`: XGBoost
- `g` or `lightgbm`: LightGBM (research comparison)
- `s` or `svm`: Support Vector Machine (linear kernel)
- `a` or `all`: Run all models and compare

### Dataset Selection (`--d`)

Choose which dataset to use:

- `o` or `original`: Original 152 patients (no synthetic data) ⭐ **Recommended for clinical use**
- `e` or `expanded`: Expanded with synthetic controls + SMOTE (default)
- `b` or `both`: Run on both datasets for comparison


### Examples

```sh
# ✅ RECOMMENDED FOR CLINICAL USE: Logistic Regression on original data
python main.py --m=logistic --d=original

# Research comparison: LightGBM on original data
python main.py --m=lightgbm --d=original

# Test SVM (kernel-based learning) on original data
python main.py --m=svm --d=original

# Compare all models on original dataset (identify best performer)
python main.py --m=all --d=original

# Demonstrate recall drop from synthetic augmentation (research use)
python main.py --m=random_forest --d=both

# ⚠️ NOT RECOMMENDED: Expanded dataset (lower recall for safest models)
python main.py --m=random_forest --d=expanded  # Only for research comparison
```


### Model Comparison Mode

When using `--m=all`, the pipeline:

1. Runs data preparation once (shared across models)
2. Trains and tests all five model types sequentially
3. Saves detailed logs to `results/logs/`
4. Displays comprehensive comparison table

### Dataset Comparison Mode

When using `--d=both`, the pipeline:

1. Runs the model on the expanded dataset (synthetic + SMOTE)
2. Runs the same model on the original dataset
3. Generates separate results files
4. Displays a comparison table showing performance differences

This mode clearly demonstrates the recall degradation from synthetic augmentation.

Statistical significance tests are triggered automatically only when running both datasets together (e.g., `python main.py --m=all --d=both`).

### Ablation Study (`--ablation`)

The ablation study systematically removes feature groups to test the model's reliance on genetic vs biomarker features. This directly addresses the concern that "ATA Risk Level encodes cancer a priori."

**Run via main pipeline:**

```sh
# Ablation study with LightGBM on expanded dataset
python main.py --ablation --m=lightgbm --d=expanded
```

**Or run the standalone script directly:**

```sh
# Full ablation study (all models, both datasets) - 80 experiments
python src/ablation_study.py --m=all --d=both

# Specific model/dataset combinations
python src/ablation_study.py --m=lightgbm --d=expanded
python src/ablation_study.py --m=xgboost --d=original
python src/ablation_study.py --m=random_forest --d=both
```

**Ablation Configurations:**

| Configuration | Features Removed | Purpose |
|---------------|------------------|---------|
| `baseline` | None | Full model performance |
| `no_risk_level` | `ret_risk_level`, interactions | Test ATA risk contribution |
| `no_variants` | All `variant_*` dummies | Test variant encoding contribution |
| `no_genetics` | All genetic features | Pure biomarker prediction |
| `no_calcitonin` | `calcitonin_*` features | Test if genetics alone suffice |
| `no_cea` | `cea_level_numeric` | Address CEA imputation concerns |
| `genetics_only` | All biomarkers, nodules | Test if model is "just consensus" |
| `biomarkers_only` | All genetic features | Clinical utility without genetics |

**Results saved to:** `results/ablation/`
- `{model}_{dataset}_ablation_results.txt` - Detailed findings
- `{model}_{dataset}_ablation_results.csv` - For analysis

**Key Finding:** With all genetic features removed, the model still achieves 94.9% accuracy using only biomarkers - proving it learns beyond "restating consensus knowledge."

### Explainability (SHAP + LIME)

- Explainability runs automatically during testing (including `python main.py --m=all --d=both`). Use `python src/test_model.py --no-explain ...` to skip.
- **SHAP**:
  - Text: `results/shap/<model>/<model>_<dataset>.txt` (e.g., `results/shap/logistic/logistic_expanded.txt`)
  - Charts (PNG): `charts/shap/<model>/` (`expanded_bar.png`, `original_bar.png`)
- **LIME** (local explanations + global summary over selected cases):
  - Results: `results/lime/<model>/`
  - Charts (PNG): `charts/lime/<model>/` (per-sample LIME plots + `lime_global_importance.png` + `lime_shap_global_<dataset>.png`)
  - The script explains 5 correctly classified + up to 5 misclassified cases (false negatives prioritized).
  - Counterfactual suggestions (when possible) are written to `results/lime/<model>/<model>_<dataset>_counterfactuals.txt`.
- Summary: `results/explainability_summary.txt`

**Important clinical disclaimer:** This project is for research and educational use only and is not medical advice or a clinical decision support device. Do not use these outputs to diagnose, treat, or delay care; consult qualified clinicians and confirm with guideline-based evaluation and genetic testing.

### Hugging Face Space (Gradio UI + API)

Interactive demo and hosted inference are available via the Hugging Face Space:

`https://huggingface.co/spaces/arjuncodess/men2-predictor`

- **Gradio app:** Use the web UI to enter patient features and view the predicted MEN2/MTC risk output.
- **API:** You can call the Space programmatically. The easiest way is `gradio_client`:

```python
from gradio_client import Client

client = Client("arjuncodess/men2-predictor")
client.view_api()
# Then call the printed endpoint with client.predict(...)
```

**Disclaimer for the Space:** The hosted app/API is provided as-is for demonstration only. It may change without notice, and it must not be used for real-world clinical decisions.

### Model comparison with patient data

**New feature:** Every test run now automatically generates a comprehensive comparison of all 5 models on the same test set, showing complete patient data alongside each model's predictions.

**What you get:**

The comparison table includes for each test patient:
- **Patient identification**: study_id for original data, source_id for synthetic controls
- **Complete clinical data**: age, sex, RET variant, risk level, calcitonin levels, nodules, family history, etc.
- **Actual diagnosis**: MTC or No_MTC
- **All model predictions**: LR, RF, LGB, XGB, SVM (marked OK for correct, XX for incorrect)
- **Color-coded terminal output**: green for correct predictions, red for incorrect
- **Accuracy summary**: total correct/incorrect for each model

**Saved file:** `results/model_comparison_{dataset_type}_detailed_results.txt`

This file includes:
- Complete legend explaining all abbreviations
- Data split methodology (80/20, stratified, random_state=42)
- SMOTE application details (only on training data)
- All held-out test patients with full clinical data
- Model predictions for easy comparison

**Why this matters:**

1. **Transparency**: See exactly which patients each model got right or wrong
2. **Pattern identification**: Identify difficult cases that multiple models miss
3. **Clinical validation**: Verify models make sense given patient characteristics
4. **Research utility**: Comprehensive data for publication and analysis
5. **Debugging**: Quickly spot if synthetic controls are causing issues

**Data split explained:**

- **Method**: 80/20 train/test split with random_state=42 (reproducible)
- **Stratification**: Maintains MTC vs No MTC ratio in both sets
- **SMOTE**: Applied only to training data after split
- **Test set**: 100% real data (original patients + synthetic controls, no SMOTE)

**Note on "synthetic controls":**

Patients with source_id (e.g., "33_control", "mtc_s0_control") are synthetic controls added to expand the dataset. These are not from SMOTE—they were generated before the train/test split and are treated as real data. SMOTE is only applied to the training set after splitting.

### Output Files

**Model Files:**

- `saved_models/{model_type}_{dataset_type}_model.pkl`

**Results:**

- `results/{model_type}_{dataset_type}_test_results.txt` - individual model performance summaries with embedded 95% confidence intervals
- `results/model_comparison_{dataset_type}_detailed_results.txt` - comprehensive comparison of all models with complete patient data
- `results/{model_type}_{dataset_type}_confidence_intervals.txt` - standalone bootstrap confidence intervals (automatically calculated for all models)
- `charts/roc_curves/{model_type}_{dataset_type}.png` - ROC curves with area under the curve and optimal-threshold marker
- `charts/confusion_matrices/{model_type}_{dataset_type}.png` - paired raw-count and normalized confusion matrices
- `charts/correlation_matrices/{model_type}_{dataset_type}.png` - feature correlation matrix for LightGBM (expanded dataset)

**Logs (when using --m=all or --d=both):**

- `results/logs/{model_type}_{dataset_type}_training.log`
- `results/logs/{model_type}_{dataset_type}_testing.log`
- `results/logs/{model_type}_{dataset_type}_confidence_intervals.log`

## Technical Details

<details>
<summary><b>Feature Engineering</b></summary>

**Demographic Features:**

- Age at clinical evaluation (years)
- Gender (binary)
- Age groups (young/middle/elderly/very_elderly)

**Genetic Features:**

- RET variant (one-hot encoded across 24 variants)
- ATA risk level (ordinal: 1=Moderate, 2=High, 3=Highest)

**Biomarker Features:**

- Calcitonin elevation status (binary)
- Calcitonin level (numeric, pg/mL)
- CEA level (numeric, ng/mL)
- CEA elevation flag (>5 ng/mL baseline)
- CEA imputed provenance flag (0 = observed, 1 = MICE+PMM)

**Clinical Features:**

- Thyroid nodules presence
- Multiple nodules indicator
- Family history of MTC
- Pheochromocytoma presence
- Hyperparathyroidism presence

**Derived Features:**

- Polynomial features (age²)
- Interactions (calcitonin×age, risk×age, nodule_severity)
- Variant-specific risk interactions

</details>

<details>
<summary><b>Pipeline Steps</b></summary>

1. **create_datasets.py:** Loads patient data from JSON (all 20 studies), performs calcitonin<->CEA correlation plus MICE+PMM imputation, and writes enriched CSVs
2. **data_analysis.py:** Computes descriptive statistics, generates visualizations
3. **data_expansion.py:** Produces variant-matched synthetic control samples (optional)
4. **train_model.py:** Trains models with cross-validation, SMOTE balancing, threshold optimization
5. **test_model.py:** Evaluates models with comprehensive metrics, risk stratification, and automatic comparison of all 5 models with complete patient data
6. **calculate_ci.py:** Calculates 95% bootstrap confidence intervals for all performance metrics (automatically runs)

</details>

<details>
<summary><b>Model Architecture</b></summary>

**Supported Models:**

- Logistic Regression (baseline, linear)
- Random Forest (ensemble)
- XGBoost (gradient boosting)
- LightGBM (gradient boosting)
- Support Vector Machine (linear)

**Training Configuration:**

- Cross-validation for hyperparameter tuning
- SMOTE balancing (applied after train/test split to prevent data leakage)
- Threshold optimization for clinical use cases
- Variant-aware feature encoding

**Evaluation Metrics:**

- Accuracy, Precision, Recall, F1-Score
- ROC-AUC, Average Precision Score, ROC curve visualizations
- Confusion matrices (raw and normalized)
- Automatic 95% bootstrap confidence intervals on all metrics (1,000 iterations)
- Risk-stratified performance

</details>

<details>
<summary><b>Dataset Characteristics</b></summary>

**Original Dataset:**

- 152 confirmed RET germline mutation carriers from 20 peer-reviewed studies
- 24 RET variants (K666N, L790F, Y791F, V804M, S891A, R525W, M918T, E505_G506del, A883F, C618S, C620Y, C620W, C630R, C630G, C634R, C634Y, C634W, C634S, C634G, E632_C634del, E632_L633del, D898_E901del, V899_E902del, D631_L633delinsE)
- Age range: 1-90 years
- Gender distribution (F/M): 107/45
- ATA risk levels: Level 1 (Moderate), Level 2 (High), Level 3 (Highest)

- **Expanded Dataset:**

- Original 152 patients + synthetic variant-matched controls (total rows: 216)
- Literature-based synthetic cases for improved balance
- SMOTE applied during training

**Data Quality Notes:**

- Multi-variant dataset includes varying penetrance and risk profiles
- Incomplete penetrance: not all carriers develop MTC
- Age-dependent risk: penetrance increases with age
- Variant-specific patterns: high-risk variants (C634\*) show different clinical patterns
- Study heterogeneity: different calcitonin reference ranges across studies

</details>

## Limitations

This study has several limitations that should be considered:

1. **Small sample size**: 152 patients is still typical for rare genetic conditions but limits statistical power
2. **Retrospective data**: Extracted from published case series, not prospective validation
3. **Study heterogeneity**: Different calcitonin reference ranges and protocols across 20 studies
4. **Limited diversity**: Primarily European descent patients; generalizability to other populations unknown
5. **No external validation**: Performance validated on held-out data from same studies, not independent cohorts

**However**: These limitations are representative of rare disease ML challenges. Our finding (synthetic data harm) is strengthened by the fact that it persists across models and datasets.

**Next steps**: Prospective validation in clinical setting with multi-center collaboration.

## License

This project is licensed under the MIT License.

## Authors & Contributions

### Harnoor Kaur
*City Montessori School, Kanpur Road, Lucknow, India*  
*E-mail: har.nooor16@gmail.com*

**Contributions:** Literature search, study identification, data curation, and biological interpretation.

### Arjun Vijay Prakash
*City Montessori School, Kanpur Road, Lucknow, India*  
*E-mail: arjunv.prakash12345@gmail.com*

**Contributions:** Designed and implemented the machine learning pipeline, trained models, performed computational analysis, developed the Hugging Face Space deployment, and maintained the reproducible codebase.

### Shashwat Mishra (Corresponding Author)
*City Montessori School, Kanpur Road, Lucknow, India*  
*E-mail: mishra.shashwat4002@gmail.com*

**Contributions:** Mentorship, advised on methodological decisions including the MICE+PMM imputation strategy, and oversaw project direction.

---

**Conflict of Interest:** The authors declare no conflicts of interest.

**Funding:** This research received no specific funding from any funding agency in the public, commercial, or not-for-profit sectors.

## Data Availability

All data and source code are publicly available in this repository. While pre-trained models are not included, the repository contains a fully reproducible pipeline to train and evaluate the models locally.

## Acknowledgements

Thanks to open source communities and packages including scikit-learn, pandas, numpy, matplotlib, seaborn, joblib, and imbalanced-learn for making data science and reproducibility accessible.

Special thanks to the authors of the research studies that provided clinical data:

- JCEM Case Reports (2025) - RET K666N carriers
- JCEM (2016) RET exon 7 deletion case
- Xu et al. Thyroid (2016) - RET K666N carriers
- European Journal of Endocrinology (2006) - Multi-variant RET carriers

```

---

## Project: app

**Description:** No description provided.

**Key Stats:** ⭐ 2 Stars | 🍴 1 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://pilot-ops-app.vercel.app
**Repository:** https://github.com/pilot-ops-crm/app

### README Content
```markdown
<p align="center">
  <a href="https://pilot-ops.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://pilot-ops.vercel.app/og.png" alt="Pilot - Instagram Automation Platform"></a>
</p>

<h3 align="center">Pilot - Instagram Automation & Deal Management Platform</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/pilot-ops-crm/app.svg)](https://github.com/pilot-ops-crm/app/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/pilot-ops-crm/app.svg)](https://github.com/pilot-ops-crm/app/pulls)
[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)]()

</div>

---

<p align="center">
  AI-powered Instagram automation for lead management and sales — built for creators, entrepreneurs, and social media managers to automate responses, manage contacts, and streamline deals.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Documentation](./docs/)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Pilot is an Instagram automation and deal management platform designed to help creators, entrepreneurs, small businesses, and social media managers transform their Instagram presence into a powerful lead generation and sales engine.

The platform features an AI-powered "Sidekick" that acts as a personalized assistant for managing deals, tracking progress, and providing intelligent recommendations. Users can automate responses to Instagram reels and interactions (e.g., replying 'YES' to receive resources or packages in their inbox), manage contacts with advanced scoring and filtering, and create custom automation workflows for repetitive tasks.

Built with modern web technologies, Pilot emphasizes AI-driven personalization, seamless Instagram integration, and user-friendly automations to streamline social commerce workflows. The platform is currently in active development and focuses on transparency through open-source practices.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** package manager
- **PostgreSQL** database (or compatible like Neon)
- **Instagram Developer Account** (for API features)

### Installing

1. **Clone the repository**

   ```bash
   git clone https://github.com/pilot-ops-crm/app.git
   cd app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and configure.

4. **Set up the database**

   ```bash
   # Generate and run migrations
   pnpm db:generate
   pnpm db:migrate

   # Optional: Open Drizzle Studio for database inspection
   pnpm db:studio
   ```

5. **Start the development server**

   ```bash
   # Basic development server
   pnpm dev

   # Or run all services together (includes Inngest and database studio)
   pnpm dev:all
   ```

The application will be available at `http://localhost:3000`.

## 🔧 Running the tests <a name = "tests"></a>

Currently, the project uses manual testing and user acceptance testing. Automated testing setup is planned for future releases.

### Manual Testing

1. **Development Testing**

   - Run the development server with `pnpm dev`
   - Test core features: Instagram login, contact management, automation creation, sidekick interactions
   - Verify database operations and API endpoints

2. **Integration Testing**

   - Test Instagram API connections
   - Verify webhook functionality
   - Test real-time features and chat integration

3. **User Journey Testing**
   - Complete onboarding flow
   - Create and test automations
   - Manage contacts and view analytics

### Code Quality Checks

Run linting and type checking:

```bash
# Lint the codebase
pnpm lint

# Type checking
pnpm typecheck
```

## 🎈 Usage <a name="usage"></a>

### Core Features

1. **Instagram Integration**

   - Connect your Instagram account via OAuth
   - Set up automated responses to reels and stories
   - Configure lead capture from direct messages

2. **Contact Management**

   - View and organize Instagram contacts in a centralized table
   - Score contacts based on engagement and relevance
   - Add custom tags and notes for better organization
   - Filter and search through your contact database

3. **Automation Workflows**

   - Create custom automation templates
   - Set up triggers based on Instagram interactions
   - Configure automated responses and follow-ups
   - Monitor automation performance and logs

4. **AI Sidekick**

   - Set up your personalized AI assistant
   - Configure prompts and behavior preferences
   - Use for deal management and recommendations
   - Track conversation history and insights

5. **Dashboard and Analytics**
   - Monitor key metrics and performance
   - View automation success rates
   - Track contact engagement and conversion

### Getting Started Workflow

1. Complete the onboarding process
2. Connect your Instagram account
3. Set up your first automation (e.g., "YES" response to reels)
4. Import or start collecting contacts
5. Configure your AI Sidekick preferences
6. Monitor and optimize your automations

For detailed guides, see the [documentation](./docs/) folder.

## 🚀 Deployment <a name = "deployment"></a>

The project is configured for deployment on Vercel with the following services:

### Production Deployment

1. **Vercel Deployment**

   - Connect your repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy automatically on pushes to main branch

2. **Required Environment Variables**

   ```env
   BETTER_AUTH_SECRET=""
   BETTER_AUTH_URL=""

   DATABASE_URL=""

   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   POLAR_ACCESS_TOKEN=""
   POLAR_ORG_SLUG=""

   INSTAGRAM_CLIENT_ID=""
   INSTAGRAM_CLIENT_SECRET=""
   NEXT_PUBLIC_APP_URL=""

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""

   GOOGLE_GENERATIVE_AI_API_KEY=""

   NODE_ENV="development"

   SENTRY_AUTH_TOKEN=""
   SENTRY_DSN=""
   ```

3. **Database Setup**

- Use Neon PostgreSQL for production database
- Run migrations on deployment: `pnpm db:migrate`

4. **Monitoring and Error Tracking**

- Sentry is configured for error tracking and performance monitoring
- Check Sentry dashboard for any production issues

5. **Domain Configuration**

- Configure custom domain in Vercel
- Update NEXTAUTH_URL to match your domain

### Additional Services

- **Inngest**: For data ingestion and workflow automation
- **Polar**: For payments and subscriptions
- **Cloudinary**: For image management and optimization

### Waitlist Integration (src/app/api/waitlist/route.ts)

The main app integrates with the marketing website (`pilot-ops.vercel.app`) through a secure API connection for waitlist functionality.

#### Setting up WAITLIST_API_TOKEN

To connect the marketing site to this app, you need to set the same token in both repositories:

1. **Generate a secure token** (any random string like `your-super-secret-token-12345`)
2. **Add to this app** (`pilot-ops-crm/app`): Set `WAITLIST_API_TOKEN=your-token-here` in your `.env.local`
3. **Add to marketing site** (`pilot-ops-crm/website`): Set `WAITLIST_API_TOKEN=your-token-here` in their `.env.local`

The token can be simple - just make sure it's identical in both places and keep it secure in your environment variables.

#### How It Works

- The marketing site collects waitlist signups and sends them to this app's `/api/waitlist` endpoint
- This app verifies the token and processes the waitlist data
- The marketing site gets a response and shows success/error messages to users

This setup keeps the marketing site lightweight while letting the main app handle all the real data processing.

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- [Next.js](https://nextjs.org/) - React Framework with App Router
- [React](https://react.dev/) - UI Library (v19.1.1)
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Node.js](https://nodejs.org/en/) - Runtime Environment

### Database & ORM

- [Drizzle ORM](https://orm.drizzle.team/) - Database Toolkit
- [PostgreSQL](https://www.postgresql.org/) - Primary Database
- [Neon](https://neon.tech/) - Serverless PostgreSQL

### Authentication & Authorization

- [Better Auth](https://better-auth.com/) - Authentication System
- [NextAuth.js](https://next-auth.js.org/) - Authentication Integration

### UI & Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - Modern UI Components
- [Radix UI](https://www.radix-ui.com/) - Headless UI Components
- [Lucide React](https://lucide.dev/) - Icon Library

### AI & External APIs

- [Vercel AI SDK](https://sdk.vercel.ai/) - AI Integration
- [Google AI](https://ai.google.dev/) - AI Provider
- [Instagram API](https://developers.facebook.com/docs/instagram) - Social Media Integration

### Development & Deployment

- [Vercel](https://vercel.com/) - Deployment Platform
- [pnpm](https://pnpm.io/) - Package Manager
- [ESLint](https://eslint.org/) - Code Linting
- [Sentry](https://sentry.io/) - Error Tracking & Performance Monitoring

### Additional Libraries

- [React Hook Form](https://react-hook-form.com/) - Form Management
- [TanStack Table](https://tanstack.com/table) - Data Tables
- [Motion](https://motion.dev/) - Animation Library
- [date-fns](https://date-fns.org/) - Date Utilities
- [Zod](https://zod.dev/) - Schema Validation

## ✍️ Authors <a name = "authors"></a>

- **ArjunCodess** - Project development and maintenance

_Note: This project embraces open-source values and transparency. We love open source because it keeps us accountable, fosters collaboration, and drives innovation. For collaboration opportunities or questions, please reach out through the appropriate channels._

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- **Instagram** for providing the API that powers our social media integrations
- **Vercel** for the excellent deployment platform and AI SDK
- **Neon** for reliable serverless PostgreSQL hosting
- **shadcn/ui** and **Radix UI** for beautiful, accessible component libraries
- **Drizzle Team** for the powerful ORM toolkit
- **Open Source Community** for the countless libraries and tools that make modern web development possible

---

<div align="center">

**Pilot** - Transforming Instagram interactions into business opportunities

_Built with ❤️ for creators and entrepreneurs_

</div>

```

---

## Project: website

**Description:** No description provided.

**Key Stats:** ⭐ 1 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://pilot-ops.vercel.app
**Repository:** https://github.com/pilot-ops-crm/website

### README Content
```markdown
<p align="center">
  <a href="https://pilot-ops.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://pilot-ops.vercel.app/og.png" alt="Pilot - Marketing & Waitlist Site"></a>
</p>

<h3 align="center">Pilot - Marketing & Waitlist Website</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/pilot-ops-crm/website.svg)](https://github.com/pilot-ops-crm/website/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/pilot-ops-crm/website.svg)](https://github.com/pilot-ops-crm/website/pulls)
[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)]()

</div>

---

<p align="center">
  The front door to Pilot — a simple, friendly site where you can learn what Pilot is all about and join the waitlist to get early access when we launch.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Integration with Main App](#integration)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is the frontend that introduces people to Pilot. It's a clean, simple site that explains what the app does and lets visitors join a waitlist for early access.

The main idea is straightforward: show off the app's features, tell the story of how it helps creators turn Instagram followers into customers, and collect email addresses from people who want to try it first.

It doesn't handle any of the heavy lifting — that all happens in the main app. This site just looks good, explains things clearly, and passes along signups to the real application through a secure API connection.

**We built it** to be fast and focused. It uses modern web tools but keeps things simple so it loads quickly and works on any device. The waitlist form is the key feature — when someone signs up, it securely sends their info to the main app for processing.

## 🏁 Let's Get You Set Up

Want to run this marketing site locally? Here's what you need to do.

### What You Need First

- Node.js version 18 or newer
- pnpm (it's like npm but faster)
- The WAITLIST_API_TOKEN from the main app (you'll get this from the main app's environment)

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/pilot-ops-crm/website.git
   cd website
   ```

2. **Install everything**

   ```bash
   pnpm install
   ```

3. **Set up your environment**
   Copy `.env.example` to `.env.local` and add your WAITLIST_API_TOKEN:
   ```env
   WAITLIST_API_TOKEN=your_token_from_main_app
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

The site should be running at `http://localhost:3000`.

## 🎈 How to Use It

### What It Does

1. **Landing Page**
   Shows what Pilot is all about, explains the main features, and guides people toward signing up.

2. **Waitlist Form**
   A simple form where visitors enter their email and name. When they submit, it securely sends this info to the main app for processing.

3. **Responsive Design**
   Looks good on phones, tablets, and computers. Uses modern styling that matches the main app's design.

### The Waitlist Flow

1. Someone visits the site and reads about Pilot
2. They click to join the waitlist
3. They enter their email and name in the form
4. The site sends this info to the main app using a secure token
5. The main app processes it and adds them to the waitlist
6. They get confirmation that they're signed up

It's all handled behind the scenes — the marketing site just collects the info and passes it along.

## 🔧 Integration with Main App

This site talks to the main Pilot app through a secure API connection. Here's how it works:

### The Connection

- Uses a special token (`WAITLIST_API_TOKEN`) to authenticate with the main app
- Sends waitlist signups to `https://pilot-ops-app.vercel.app/api/waitlist`
- The main app handles storing the data and managing the waitlist

### Getting the WAITLIST_API_TOKEN

To set up the connection between the marketing site and main app, you just need to generate the same token in both repositories' environment variables:

1. **Generate a secure token** (can be any random string like `your-super-secret-token-12345`)
2. **Add to marketing site** (this repo): Set `WAITLIST_API_TOKEN=your-token-here` in your `.env.local`
3. **Add to main app** (`pilot-ops-crm/app`): Set `WAITLIST_API_TOKEN=your-token-here` in your `.env.local`

The token doesn't need to be complex - just make sure it's the same in both places and keep it secure.

### Security

- The token is stored as an environment variable (never in the code)
- All communication happens over HTTPS
- The marketing site doesn't store any sensitive data — it just passes it along

### Why This Setup?

It keeps things separate: the marketing site handles the pretty frontend, and the main app handles the real work. This way, the marketing site stays fast and focused, while the main app can grow and change without affecting the public face of the project.

## 🚀 Putting It Live

This site is set up to deploy on Vercel, just like the main app.

### Getting It Live

1. **Vercel Setup**
   Connect your GitHub repo to Vercel, set up the environment variables in their dashboard, and it will deploy automatically when you push to main.

2. **Environment Variables You Need**
   ```env
   WAITLIST_API_TOKEN=your_token_from_main_app
   ```

3. **Custom Domain**
   Set up your custom domain in Vercel and make sure it matches what you want.

The site will be live and ready to collect waitlist signups!

## ⛏️ What We Built It With

### Core Stuff

- **Next.js** with the App Router for the main framework
- **React** for the user interface (version 19)
- **TypeScript** to catch errors before they happen
- **Node.js** to run everything

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Next Themes** for dark/light mode

### Making It Work

- **Axios** for sending data to the main app
- **Vercel Analytics** for tracking how people use the site

### Development Tools

- **Vercel** for hosting and deployment
- **pnpm** for managing packages
- **ESLint** to check code quality

## ✍️ Who Built This

- **ArjunCodess** - **We made this and we keep working on it**

**We believe** in open source because it keeps things honest and helps everyone get better together. If you want to collaborate or have questions, just reach out.

## 🎉 Thanks to

- **Vercel** for making deployment so smooth
- **shadcn/ui** for great components we could build on
- **The main Pilot app** for handling all the real work behind the scenes
- **Everyone in open source** who shares their work and makes this possible

---

<div align="center">

**Pilot** - Transforming Instagram interactions into business opportunities

_Built with ❤️ for creators and entrepreneurs_

</div>

```

---

## Project: VendX-Admin

**Description:** No description provided.

**Key Stats:** ⭐ 2 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://vendx-admin.vercel.app
**Repository:** https://github.com/ArjunCodess/VendX-Admin

### README Content
```markdown
# VendX

## Introduction

Welcome to VendX: the E-Commerce Website Template with an Admin Panel!

Admin Panel - https://vendx-admin.vercel.app/
Store - https://vendx-store.vercel.app/

This application provides a complete solution for managing and displaying products, categories, and orders, complete with user authentication and a fully functional admin dashboard.

> **NOTE**: This project is based on a tutorial by Code With Antonio (https://youtu.be/5miHyP6lExg). 

> Please note that this project is not an exact replica of the one shown in the video due to differences in the tech stack:

> Next.js 13 → Next.js 14 | Prisma → Drizzle | Recharts → shadcn/ui charts

> This project was created primarily to learn Drizzle, but it also serves as a comprehensive e-commerce template.

## Table of Contents

1. ✅ Environment Setup (Admin)
2. ✅ Clerk Authentication (Admin)
3. ✅ Modal Components (Admin)
4. ✅ Form Components (Admin)
5. ✅ Drizzle ORM, Neon, MySQL Setup (Admin)
6. ✅ Dashboard Setup (Admin)
7. ✅ Navigation Bar (Admin)
8. ✅ Settings Page (Admin)
9. ✅ Billboards Entity (Admin)
10. ✅ Data Table (Admin)
11. ✅ Categories Entity (Admin)
12. ✅ Sizes Entity (Admin)
13. ✅ Colors Entity (Admin)
14. ✅ Products Entity (Admin)
15. ✅ Orders Entity (Admin)
16. ✅ Environment Setup & Featured Products (Store)
17. ✅ Individual Product Screen (Store)
18. ✅ Individual Category Screen (Store)
19. ✅ Product Preview Modal Components (Store)
20. ✅ Add to Cart Functionality (Store)
21. ✅ Checkout Functionality (Admin, Store)
22. ✅ Dashboard Page (Admin)
23. ✅ Dark Mode (Admin)
24. ✅ Deployment to Vercel (Admin, Store)

## Features Yet to Be Implemented

1. Multiple Images for Products
2. A REAL Payment Flow (use `isPaid: true` for queries in the dashboard)
3. Multiple Stores per User Functionality
4. Use `isArchived: true` Property in the Dashboard
```

---

## Project: VendX-Store

**Description:** No description provided.

**Key Stats:** ⭐ 1 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, JavaScript, CSS
**Live Demo:** https://vendx-store.vercel.app
**Repository:** https://github.com/ArjunCodess/VendX-Store

### README Content
```markdown
# VendX

## Introduction

Welcome to VendX: the E-Commerce Website Template with an Admin Panel!

Admin Panel - https://vendx-admin.vercel.app/
Store - https://vendx-store.vercel.app/

This application provides a complete solution for managing and displaying products, categories, and orders, complete with user authentication and a fully functional admin dashboard.

> **NOTE**: This project is based on a tutorial by Code With Antonio (https://youtu.be/5miHyP6lExg). 

> Please note that this project is not an exact replica of the one shown in the video due to differences in the tech stack:

> Next.js 13 → Next.js 14 | Prisma → Drizzle | Recharts → shadcn/ui charts

> This project was created primarily to learn Drizzle, but it also serves as a comprehensive e-commerce template.

## Table of Contents

1. ✅ Environment Setup (Admin)
2. ✅ Clerk Authentication (Admin)
3. ✅ Modal Components (Admin)
4. ✅ Form Components (Admin)
5. ✅ Drizzle ORM, Neon, MySQL Setup (Admin)
6. ✅ Dashboard Setup (Admin)
7. ✅ Navigation Bar (Admin)
8. ✅ Settings Page (Admin)
9. ✅ Billboards Entity (Admin)
10. ✅ Data Table (Admin)
11. ✅ Categories Entity (Admin)
12. ✅ Sizes Entity (Admin)
13. ✅ Colors Entity (Admin)
14. ✅ Products Entity (Admin)
15. ✅ Orders Entity (Admin)
16. ✅ Environment Setup & Featured Products (Store)
17. ✅ Individual Product Screen (Store)
18. ✅ Individual Category Screen (Store)
19. ✅ Product Preview Modal Components (Store)
20. ✅ Add to Cart Functionality (Store)
21. ✅ Checkout Functionality (Admin, Store)
22. ✅ Dashboard Page (Admin)
23. ✅ Dark Mode (Admin)
24. ✅ Deployment to Vercel (Admin, Store)

## Features Yet to Be Implemented

1. Multiple Images for Products
2. A REAL Payment Flow (use `isPaid: true` for queries in the dashboard)
3. Multiple Stores per User Functionality
4. Use `isArchived: true` Property in the Dashboard
```

---

## Project: typethelyrics

**Description:** No description provided.

**Key Stats:** ⭐ 4 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, JavaScript, CSS
**Live Demo:** https://typethelyrics.vercel.app
**Repository:** https://github.com/ArjunCodess/typethelyrics

### README Content
```markdown
# TypeTheLyrics - Type Along with Your Favorite Songs

This project is a fun and engaging web application that allows users to practice their typing skills while following along with synchronized lyrics from their favorite Spotify songs.  It combines a typing test with a music player, creating an interactive and motivating experience. Users can input a Spotify track URL, and the application will fetch the lyrics and synchronize the typing test with the music playback.


## Features

*   **Synchronized Lyrics:**  Type along with the music in real-time, thanks to synchronized lyrics.
*   **Typing Test:**  Tracks words per minute (WPM) and accuracy.
*   **Spotify Integration:**  Seamlessly integrates with Spotify to fetch song details and lyrics.
*   **Leaderboard:**  Compete with others by viewing the leaderboard of top typists and most played songs.
*   **User Authentication:** Secure user accounts for score saving.
*   **Customizable Filters:** Option to enable lowercase only or remove punctuation from the lyrics.
*   **Responsive Design:**  Works smoothly on various screen sizes.


## Usage

1.  Enter a valid Spotify track URL.
2.  Choose optional filters (lowercase, no punctuation).
3.  Click "Get Lyrics" to start.
4.  Type the lyrics as they appear, synchronized with the Spotify player.
5.  View your WPM, raw WPM, and accuracy after finishing the test.
6.  Check out the Leaderboard to see how you rank against other users and popular songs.


## Installation

1.  Clone the repository: `git clone https://github.com/[YourGitHubUsername]/TypeTheLyrics.git`
2.  Navigate to the project directory: `cd TypeTheLyrics`
3.  Install dependencies: `npm install` or `yarn install` or `pnpm install` or `bun install`
4.  Run the development server: `npm run dev` or `yarn dev` or `pnpm dev` or `bun dev`


## Technologies Used

*   **Next.js:**  React framework for building the user interface.
*   **React:**  JavaScript library for building user interfaces.
*   **Tailwind CSS:**  Utility-first CSS framework for styling.
*   **Supabase:**  Backend service for authentication and database management.  Provides authentication and a PostgreSQL database for user data and song tracking.
*   **Spotify Web API:**  Used to fetch song information and lyrics from Spotify.
*   **`@supabase/auth-helpers-nextjs`:**  Supabase helper library for Next.js authentication.
*   **Lucide:** Icon library for UI elements.
*   **clsx:** Utility for efficiently joining classNames.
*   **tailwind-merge:** Utility for merging Tailwind CSS classes.
*   **class-variance-authority:** Utility for creating reusable and variant-aware CSS classes.
*   **`next/font`:** Next.js's font optimization library.


## API Documentation

### `/api/leaderboard`

**GET**

Returns the top 10 users and top 10 songs.

**Response:**

```json
{
  "topUsers": [
    { "username": "user1", "score": 1000 },
    // ... more users
  ],
  "topSongs": [
    {
      "title": "Song 1",
      "artist": "Artist 1",
      "play_count": 50,
      "spotify_url": "spotify_url",
      "most_played_by_username": "user1"
    },
    // ... more songs
  ]
}
```

### `/api/lyrics`

**POST**

Requires a Spotify track URL. Returns lyrics and synchronized lyrics data if available.

**Request Body:**

```json
{
  "url": "spotify_track_url"
}
```

**Response:**

```json
{
  "lyrics": "Song lyrics",
  "syncType": "SYNCED" or "UNSYNCED",
  "syncedLyrics": [
     { "startTimeMs": 1000, "words": "First line" },
     // ...more synced lyrics
  ],
  "trackDetails": {
    "track_name": "Song Title",
    "track_artist": "Artist Name",
    "track_album": "Album Name",
    "track_duration": "03:20.50"
  }
}
```

### `/api/scores`

**POST**

Submits typing test scores and updates the user's score in the database.

**Request Body:**

```json
{
  "wpm": 60,
  "accuracy": 95,
  "userId": "user_id"
}
```

**Response:**

```json
{
  "success": true,
  "score": 547,
  "totalScore": 1547
}
```

### `/api/songs`

**POST**

Tracks a song play, updating play count and potentially the user who played it most.

**Request Body:**

```json
{
  "songDetails": {
    "track_name": "Song Title",
    "track_artist": "Artist Name",
    "track_album": "Album Name",
    "track_duration": "03:20.50"
  },
  "spotifyUrl": "spotify_track_url",
  "userId": "user_id" // optional
}
```

**Response:**

```json
{
  "success": true,
  "songId": "song_id"
}
```


## Dependencies

Refer to `package.json` for a complete list of project dependencies.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## Testing

No explicit testing framework is present in this codebase.  Adding unit or integration tests is recommended for future development.


*README.md was made with [Etchr](https://etchr.dev)*
```

---

## Project: starfall

**Description:** No description provided.

**Key Stats:** ⭐ 12 Stars | 🍴 1 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://starfall-kit.vercel.app
**Repository:** https://github.com/ArjunCodess/starfall

### README Content
```markdown
# Starfall - Full-Stack Web Application Starter Kit

<video src="https://github.com/user-attachments/assets/eaef4da2-e49c-48b1-9e84-7080a7a3b217" controls autoPlay>Your browser does not support the video tag.</video>

Starfall is a Neon-powered starter kit to streamline building full-stack web applications for developers.

It comes equipped with everything developers need to create cutting-edge, high-performance apps.

The purpose of Starfall is to provide developers with an easy-to-use full-stack web application.

It has all the resources you want to construct innovative, scalable & reactive applications.

Full documentation can be found at [Starfall Docs](https://starfall-docs.vercel.app/).

## 🧳 Application Tour

Here's a quick tour of the application:

| Light Mode | Dark Mode |
|------------|-----------|
| '/' page![Light1](/public/light1.PNG "Light Mode") | '/' page![Dark1](/public/dark1.PNG "Dark Mode") |
| '/dashboard' page![Light2](/public/light2.PNG "Light Mode") | '/dashboard' page![Dark2](/public/dark2.PNG "Dark Mode") |
| '/admin' page![Light3](/public/light3.PNG "Light Mode") | '/admin' page![Dark3](/public/dark3.PNG "Dark Mode") |
| '/admin' page![Light4](/public/light4.PNG "Light Mode") | '/admin' page![Dark4](/public/dark4.PNG "Dark Mode") |

## 🛠️ Core Technologies

A quick look at what Starfall offers:

- **Next.js:** A powerful React framework that makes it easy to build SEO-friendly, fast web apps. Enables us to easily do server-side rendering and build static websites.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Shadcn/UI:** A kit of prebuilt UI components This is perfect for creating visually attractive user interfaces.
- **Aceternity UI:** for other design elements that can make the overall application a little more aesthetically appealing.
- **Neon:** A serverless PostgreSQL database. It’s easy to manage and scales as your app scales.
- **Drizzle ORM:** An ORM (Object-Relational Mapping) tool that simplifies database operations, making it easier to interact with the database.
    - **SQL-like:** Allows you to write queries that feel like plain SQL.
    - **Relational:** Supports traditional relational database features.
- **Clerk:** This handles user authentication. It’s secure and flexible, managing sign-in, sign-up, and user profiles.
    > We use webhooks to connect Clerk with the database. This way, whenever a user is created, they’re also added to our backend.
- **TypeScript:** An upgrade to JavaScript that adds static typing. It helps catch errors early and makes your code more predictable.

## 🚀 Why Starfall?

### 1. **Comprehensive Starter Kit**
Starfall is more than just a basic template.

It offers a full set of tools and components. These tools work together to make your development process easier. Everything you need, like authentication and animations, is included right from the start.

### 2. **Scalable, and Easy to Maintain**
Starfall's architecture is built for growth.
   
It uses best practices for organizing folders, designing components, and managing state. This helps keep your project easy to maintain as it expands. Security features are also built-in to keep your project safe.

### 3. **Beautifully Designed UI**
Starfall makes your app look modern, thanks to Shadcn/UI and Aceternity UI.
   
You can easily switch between dark and light modes. Plus, you can customize gradients and blur effects for a unique look.

### 4. **Focus on Developer Experience**
Starfall is made with developers in mind.
   
The code is clean and easy to understand. It follows modern best practices and comes with good documentation. Pre-configured environments mean you spend less time setting up and more time building features.

## 📚 Getting Started

To begin using Starfall, all that is required is a couple of things.

### Step 1
- Well, the first thing you should do is make sure that Node.js is installed on your computer.
- You will even need npm, which is a tool for package management.
- After that, you're all set up to enter Starfall and build your app.

### Step 2

```bash
git clone https://github.com/ArjunCodess/neon-oss-starter-kit.git my-app
```
    

### Step 3

```bash
cd my-app
```
    
### Step 4

```bash
npm install
```

### Step 5

Rename the .env.example file to .env. And pull up your environment variables and paste them in the .env file.
    
Having trouble? Check out the [configuration guide](https://starfall-docs.vercel.app/docs/configuration)

### Step 6
    
```bash
npm run dev
```

### Step 7

And now, open [localhost:3000](http://localhost:3000) on your browser to continue.

That's it! You have successfully installed the Starfall Starter Kit on your machine. You can now start building your next big project using the built-in components and features provided by the kit.

## 💻 **What are the commands that you can use?**

These are the commands that you can use and what they do in brief:

- **`npm run dev`** - Starts the development server, allowing you to work on your project with hot-reloading enabled.
- **`npm run build`** - Compiles the project for production, optimizing it for performance.
- **`npm run start`** - Runs the compiled project in production mode.
- **`npm run lint`** - Checks the code for potential issues and inconsistencies using ESLint.
- **`npm run db:studio`** - Launches Drizzle Studio, a local database browser that allows you to explore and manage your database.
- **`npm run db:push`** - Pushes your schema changes directly to the database, useful for rapid local development and prototyping.
- **`npm run db:generate`** - Generates migrations based on your Drizzle schema, creating migration files that can be applied to your database.
- **`npm run db:migrate`** - Applies the generated migrations to your database, ensuring it matches your schema.

## 👨‍💻 My Journey

I chose this stack because it provides a complete set of tools for modern web development.

Using Next.js and Tailwind CSS makes building fast, responsive apps easy. Neon and Drizzle ORM simplify database management. Clerk handles authentication, which is crucial for secure applications. TypeScript adds extra reliability to the code. 

Throughout this process, I learned how to integrate these tools effectively. It was challenging but rewarding to see everything come together in a single starter kit. I would like to thank DEV and Neon for organising a challenge like this!

## 👌 Features

Starfall is packed with features that streamline full-stack web development.

The starter kit includes a complete full-stack to-do-list app with Next.js, Tailwind CSS, Shadcn/UI, Aceternity UI, Neon, Drizzle ORM, Clerk, and TypeScript.

These tools work together to help you build fast, secure, and scalable applications quickly.

## 💢 Challenges Faced

One of the biggest challenges I faced was writing the documentation.

It was tough to organize everything clearly, but I made it through. On the flip side, building the "extra" components and the admin page was a lot of fun. The dashboard page was surprisingly quick to put together, taking the least time overall.

## ☘ Future Plans

The Starfall template is complete on my end.

However, I’m open to continuing its development if there’s enough interest from the community.

With more feedback and contributions, I’d love to see where this project could go.

## 🤝 Community Contribution

I’m always open to new ideas and feedback from the community.

If you’d like to contribute to Starfall, feel free to fork the repository, submit pull requests, or open issues.

Your input is valuable, and I’m excited to see how this project can evolve with community involvement.

---

## ✍ PS

Thanks for checking out Starfall! 🎉

I hope this starter kit makes your development process easier and helps you build amazing projects quickly.

If you have any questions or feedback, feel free to reach out or open an issue on the GitHub repo.

Connect with me: [Linktree](https://linktr.ee/arjuncodess). Follow me on [X](https://x.com/arjuncodess).

```

---

## Project: astroscope

**Description:** AstroScope is an interactive dashboard that visualizes near-Earth asteroid data from NASA's NeoWs API. 

**Key Stats:** ⭐ 7 Stars | 🍴 1 Forks
**Tech Stack:** Python
**Live Demo:** https://astroscope.streamlit.app/
**Repository:** https://github.com/ArjunCodess/astroscope

### README Content
```markdown
# 🔭 AstroScope: NASA Asteroid Dashboard

<div align="center">
  <a href="https://youtu.be/VmNRG0jzy6o">
    <img src="https://img.youtube.com/vi/VmNRG0jzy6o/0.jpg" alt="AstroScope Demo" width="600" />
  </a>
</div>

AstroScope is an interactive dashboard that visualizes near-Earth asteroid data from NASA's NeoWs API. It provides insights into asteroid sizes, velocities, miss distances, and potential hazards.

## 📋 Features

- **Data Fetching**: Automatically fetches asteroid data from NASA's NeoWs API
- **Data Analysis**: Calculates risk scores, identifies anomalies, and generates time series data
- **Interactive Dashboard**: Visualizes asteroid data with interactive charts and tables
- **Filtering**: Filter data by date range and risk threshold
- **Risk Heatmap Calendar**: GitHub-style calendar heatmap of daily average risk scores
- **Daily Closest Miss Table**: Ranks the top 10 dates by the closest asteroid approach, with details per day
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Python 3.7 or higher
- NASA API key (get one at [https://api.nasa.gov](https://api.nasa.gov))

### Getting a NASA API Key

1. Go to [https://api.nasa.gov](https://api.nasa.gov).
2. In the "Generate API Key" form, fill in the required fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - How will you use the APIs? (optional)
3. Submit the form and check your email to receive your API key.
4. Add the key to your `.env` file:
   ```
   NASA_API_KEY="YOUR_KEY_HERE"
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArjunCodess/astroscope.git
   cd astroscope
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Duplicate the `.env.example` file to create a `.env` file in the project root directory and update the `NASA_API_KEY` with your own key:
   ```
   NASA_API_KEY=""
   ```

### Configuration

The application can be configured using environment variables in the `.env` file:

- `NASA_API_KEY`: Your NASA API key (required)
- `DATA_FETCH_DAYS`: Number of days to fetch asteroid data for (default: 30)
- `DATA_DIR`: Directory to store data files (default: "data")
- `API_CHUNK_SIZE`: Maximum number of days per API request (default: 7, NASA API limit)
- `RISK_THRESHOLD`: Threshold for classifying asteroids as high risk (default: 0.6)

## 📊 Running the Application

Start the Streamlit dashboard with a single command:

```bash
python -m streamlit run app.py
```

The dashboard will be available at [http://localhost:8501](http://localhost:8501).

The application will automatically:
1. Check if data files exist
2. If not, fetch asteroid data from NASA's NeoWs API
3. Process the raw data into a clean format
4. Analyze the data to calculate risk scores and generate time series data
5. Display the interactive dashboard
   - Includes a "Daily Closest Miss" table showing the closest approach per day and ranking the top 10 dates by proximity

> **Note**: You can still run the data pipeline steps separately if needed:
> - `python -m lib.data_fetcher` - Fetch data only
> - `python -m lib.data_processing` - Process data only
> - `python -m lib.analysis` - Analyze data only

## 📁 Project Structure

- `app.py`: Main Streamlit application
- `lib/`: Library modules
  - `data_fetcher.py`: Fetches data from NASA's NeoWs API
  - `data_processing.py`: Processes raw data into clean format
  - `analysis.py`: Analyzes data and calculates risk scores
  - `visualizer.py`: Creates visualizations for the dashboard
- `data/`: Data directory (created automatically)
- `docs/`: Documentation
  - `PRD.md`: Product Requirements Document

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
```

---

## Project: chemistrycheck

**Description:** No description provided.

**Key Stats:** ⭐ 3 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://chemistrycheck.vercel.app
**Repository:** https://github.com/ArjunCodess/chemistrycheck

### README Content
```markdown
<p align="center">
  <a href="https://chemistrycheck.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://chemistrycheck.vercel.app/og-image.png" alt="ChemistryCheck - Chat Analysis & Insights"></a>
</p>

<h2 align="center">ChemistryCheck - AI-Powered Chat Analysis & Relationship Insights</h2>

<p align="center">
  Decode your chats. Understand your relationships. Get brutally honest insights about what's really happening between the lines. Upload WhatsApp, Telegram, or Instagram chat exports and let AI analyze communication patterns, spot red flags, and reveal relationship dynamics. Plus, chat with an AI that has full context of your conversation history.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

ChemistryCheck is an AI-powered chat analysis tool that helps you understand what's really happening in your conversations. Upload your chat history from WhatsApp, Telegram, or Instagram, and get comprehensive insights into communication patterns, relationship dynamics, and potential red flags.

The main idea is straightforward: analyze chat exports to reveal patterns that might not be obvious at first glance. Who's more invested? Are there warning signs? Is this genuine connection or something else? The AI analyzes message frequency, response times, word usage, emoji patterns, and more to give you honest, data-driven insights.

**I built it** to help people see beyond the surface of their conversations. It uses modern web tools and AI to process chat data, generate statistics, and provide actionable insights through an intuitive dashboard. The analysis includes everything from basic stats (message counts, word frequency) to advanced AI-powered relationship health scores and personality insights.

## 🏁 Getting Started <a name = "getting_started"></a>

Want to run ChemistryCheck locally? Here's what you need to do.

### What You Need First

- Node.js version 18 or newer
- A PostgreSQL database (I use Neon, but any PostgreSQL database works)
- A Google Gemini API key for AI insights
- Google OAuth credentials (optional, for social login)

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/your-username/chemistrycheck.git
   cd chemistrycheck
   ```

2. **Install everything**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up your environment**

   Create a `.env` file in the root directory with the following variables:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=
   BLOB_READ_WRITE_TOKEN=
   APP_URL=http://localhost:3000
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

4. **Set up the database**

   Run the database migrations:

   ```bash
   npx drizzle-kit push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

The application should be running at `http://localhost:3000`.

## 🎈 Usage <a name = "usage"></a>

### What It Does

1. **Upload Chat Exports**
   - Support for WhatsApp (.txt), Telegram (.json), and Instagram (.json) chat exports
   - Secure file upload using Vercel Blob storage
   - Automatic platform detection and parsing
   - Changed your mind? Delete your uploaded file instantly before analysis starts
   - Clear transparency about how your data is handled—shown right after upload
   - Chat files are deleted from storage immediately after analysis is complete. The project is fully open source for transparency.

2. **AI-Powered Analysis**
   - Analyzes message patterns, response times, word frequency, and emoji usage
   - Generates relationship health scores and interest percentages
   - Identifies communication patterns and potential red flags
   - Provides personality insights and attachment style analysis

3. **Comprehensive Dashboard**
   - View all your analyses in one place
   - Visual identification of WhatsApp, Telegram, and Instagram analyses with colored platform icons
   - Detailed statistics and visualizations
   - Activity patterns (messages by hour, day, month)
   - Response time analysis
   - Media statistics
   - Emoji analysis
   - AI-generated insights and summaries

4. **RAG Chatbot** 🆕
   - Chat with an AI that has full context of your conversation
   - Ask questions like "When did we first say I love you?" or "Find messages about our trip"
   - Semantic search powered by pgvector embeddings
   - Owner-only access (hidden on public/shared links)

5. **Shareable Analysis**
   - Make analyses public and shareable
   - View detailed breakdowns of communication patterns

### The Analysis Flow

1. Sign up or sign in to your account
2. Navigate to "New Analysis" and select your platform (WhatsApp, Telegram, or Instagram)
3. Upload your chat export file
4. Get redirected to the analysis page instantly while processing happens in the background
5. View comprehensive insights once the AI finishes analyzing
6. Access your analysis history from the main dashboard

The analysis includes everything from basic message counts to advanced AI insights about relationship dynamics, helping you understand what's really happening in your conversations.

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- **Next.js 15.2.3** with App Router for the main framework
- **React 19** for the user interface
- **TypeScript** for type safety
- **Node.js** to run everything

### Database & ORM

- **Drizzle ORM** for database management
- **Neon PostgreSQL** (or any PostgreSQL database) for data storage
- **Better Auth** for authentication and session management

### AI & Processing

- **Vercel AI SDK** for unified AI interactions and streaming
- **Google Gemini AI** (gemini-3-flash-preview) for generating relationship insights and analysis
- **Gemini text-embedding-004** for semantic embeddings (RAG chatbot)
- **pgvector** for vector similarity search
- **Inngest** for background job processing (parsing & embedding)
- Custom chat parsers for WhatsApp, Telegram, and Instagram exports

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components (dialogs, dropdowns, tabs, etc.)
- **Lucide React** for icons
- **Next Themes** for dark/light mode support
- **Recharts** for data visualization
- **React D3 Cloud** for word cloud visualizations

### Storage & Deployment

- **Vercel Blob** for secure file storage
- **Vercel** for hosting and deployment
- **Vercel Analytics** for tracking usage

### Development Tools

- **ESLint** for code quality
- **Drizzle Kit** for database migrations
- **pnpm/npm** for package management

## 🚀 Deployment <a name = "deployment"></a>

This application is set up to deploy on Vercel.

### Getting It Live

1. **Vercel Setup**
   - Connect your GitHub repository to Vercel
   - Set up the environment variables in the Vercel dashboard
   - Deploy automatically when you push to main

2. **Environment Variables You Need**
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=
   BLOB_READ_WRITE_TOKEN=
   APP_URL=https://your-domain.vercel.app
   BETTER_AUTH_URL=https://your-domain.vercel.app
   BETTER_AUTH_SECRET=
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

3. **Database Setup**
   - Set up a PostgreSQL database (Neon, Supabase, or any PostgreSQL provider)
   - Run migrations: `npx drizzle-kit push`
   - Ensure the `DATABASE_URL` is correctly configured

4. **Custom Domain**
   - Set up your custom domain in Vercel if desired
   - Update `APP_URL` to match your domain

The application will be live and ready to analyze chat conversations!

## ✍️ Author <a name = "authors"></a>

**ArjunCodess** - The sole developer and creator of ChemistryCheck

Built with the goal of helping people understand their relationships better through data-driven insights.

## 🎉 Acknowledgments <a name = "acknowledgement"></a>

- **Vercel** for making deployment smooth and hosting the application
- **shadcn/ui** for providing excellent UI components to build upon
- **Google Gemini** for powering the AI insights
- **Drizzle ORM** for making database management straightforward
- **Better Auth** for handling authentication seamlessly
- **The open source community** for all the amazing tools and libraries that made this possible

---

<div align="center">

**ChemistryCheck** - Decode your chats. Understand your relationships.

_Built with ❤️ for those seeking honest insights_

</div>

```

---

## Project: algorithm_visualizer_pygame

**Description:** No description provided.

**Key Stats:** ⭐ 3 Stars | 🍴 0 Forks
**Tech Stack:** Python
**Repository:** https://github.com/ArjunCodess/algorithm_visualizer_pygame
**Topics:** algorithm-visualisation, algorithm-visualizer, gui, pygame, python, sorting-algorithms

### README Content
```markdown
# SortingWiz
#### Video Demo: https://www.youtube.com/watch?v=hjY9Ifs8L6U
#### Description:
Hi everyone! I am Arjun Vijay Prakash from India and I will be taking you through this project.

SortingWiz is a Python and Pygame-based interactive sorting algorithm visualizer. It allows you to see how different sorting algorithms work in real-time by providing a visual representation of the sorting process.

Let’s look at some features of SortingWiz. You can visualize sorting algorithms in real-time, control the execution step by step, adjust the speed dynamically, and even enjoy sound effects to enhance your experience.

SortingWiz supports multiple sorting algorithms such as Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort. You can choose your preferred algorithm and see it in action.

For those who are interested in technical details, SortingWiz shows the time and space complexity of each sorting algorithm. It is a great way to learn about different algorithms’ efficiency.

I appreciate your company throughout this exploration of SortingWiz. I hope it was both educational and fun for you. Feel free to try it out with different sorting algorithms. In case of any questions or feedback, please don’t hesitate to contact me. Happy sorting!

**Getting Started**
Requirements:
- **Python 3**

- **Pygame library**

**Installation:**
```py
pip install pygame
```
Running the Program:
```py
python sortingwiz.py
```

**Features**
Visualization of the following sorting algorithms:
- Bubble Sort
- Insertion Sort
- Selection Sort
- Heap Sort
- Real-time updates during sorting process.

There are the key user controls for the sorting program: a start/stop button, reset button, sorting order change(ascending/descending), and switch to another algorithm.

**Controls**
- Q: Quit the program.

- R: Reset the list.

- Space: Start/stop sorting.

- A: Sort in ascending order.

- D: Sort in descending order.

- I: Select Insertion Sort.

- B: Select Bubble Sort.

- S: Select Selection Sort.

- H: Select Heap Sort.

**User Interface**
**Title**: Displays the current sorting algorithm and order.

**Controls**: Shows key commands for user interaction.

**Sorting Options**: Lists available sorting algorithms.

**Sorting Visualization**: Displays a visual representation of the sorting process.

**Additional Information**: Displays project details and author information.

**Contributing**
If you'd like to contribute to SortingWiz, please follow these steps:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes.
- Submit a pull request.

**Author**
[Arjun Vijay Prakash (@ArjunCodess)](https://arjuncodess.vercel.app/)

**Acknowledgments**
This project was developed as a part of the CS50 Fall 2023 Final Project - SortingWiz.

```

---

## Project: FlashReels

**Description:** No description provided.

**Key Stats:** ⭐ 3 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, JavaScript, CSS
**Live Demo:** https://flashreels.vercel.app
**Repository:** https://github.com/ArjunCodess/FlashReels

### README Content
```markdown
<h2 align="center">Flash Reels - AI-Powered Video Creation Platform</h2>

<p align="center">
  Transform your ideas into professional videos without technical skills. Our AI-powered platform makes it easy to create, edit, and share scroll-stopping content that drives engagement.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Environment Variables](#environment_variables)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Flash Reels is an AI-powered video creation platform that enables users to generate professional reels and short videos with just a few clicks. The platform combines multiple AI services to automate the entire video creation workflow—from script generation to final video rendering.

The main idea is straightforward: users provide a topic, select their preferences for style, voice, and caption design, and the platform handles the rest. It generates a script using Google Gemini, creates AI images using Fal.ai's Flux model, converts text to speech using Microsoft Edge TTS, generates synchronized captions with Deepgram, and renders the final video using Remotion.

**I built it** to make video creation accessible to everyone. No video editing skills required—just creativity and an idea. The platform handles all the technical complexity behind the scenes, allowing creators to focus on their content.

## 🏁 Getting Started <a name = "getting_started"></a>

Want to run Flash Reels locally? Here's what you need to do.

### What You Need First

- Node.js version 18 or newer
- pnpm (recommended), npm, yarn, or bun
- A PostgreSQL database (I use Neon)
- API keys for the following services:
  - Clerk (authentication)
  - Google Gemini (script generation)
  - Fal.ai (image generation)
  - Deepgram (caption generation)
  - Cloudinary (media storage)
  - GitHub Personal Access Token (for video rendering workflow)

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/your-username/FlashReels.git
   cd FlashReels
   ```

2. **Install everything**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up your environment**
   
   Create a `.env.local` file in the root directory and add all required environment variables (see [Environment Variables](#environment_variables) section below).

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

   This will create the necessary tables in your PostgreSQL database using Drizzle ORM.

5. **Start the development server**

   ```bash
   pnpm dev
   ```

The site should be running at `http://localhost:3000`.

## 🎈 Usage <a name = "usage"></a>

### What It Does

1. **Create New Video**
   - Navigate to the "Create New" page from the dashboard
   - Enter a topic for your video
   - Select an image style (e.g., Realistic, Artistic, Cinematic)
   - Choose a voice for text-to-speech
   - Pick a caption style (Classic, Supreme, Glitch, Fire, Futuristic)
   - Optionally set the video duration
   - Click "Create" and wait for the AI to generate your video

2. **Video Generation Workflow**
   - The platform generates a script using Google Gemini based on your topic
   - AI images are created for each scene using Fal.ai's Flux model
   - Text-to-speech audio is generated using Microsoft Edge TTS
   - Captions are automatically generated with Deepgram for perfect synchronization
   - All assets are uploaded to Cloudinary for storage
   - The video data is saved to the database

3. **Video Rendering**
   - Once created, videos can be rendered using Remotion
   - Rendering is handled via GitHub Actions workflow
   - The rendered video is available for download

4. **Dashboard**
   - View all your created videos
   - See video status (generating, completed, etc.)
   - Access video details and editing options

5. **Community**
   - Browse videos created by other users
   - Search and filter videos
   - View public video content

6. **Favorites**
   - Save videos you like to your favorites
   - Quick access to your favorite content

### The Video Creation Flow

1. User selects topic and preferences
2. AI generates a script with scene descriptions
3. AI creates images for each scene
4. Text-to-speech converts script to audio
5. Captions are generated with precise timing
6. All assets are stored in Cloudinary
7. Video data is saved to the database
8. User can render and download the final video

## 🔧 Environment Variables <a name = "environment_variables"></a>

The following environment variables are required for the application to work:

### Required Variables

```env
# Database
NEXT_PUBLIC_DATABASE_URL=your_neon_postgresql_connection_string

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
FAL_AI_API_KEY=your_fal_ai_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key

# Media Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Video Rendering (GitHub Actions)
PAT_TOKEN=your_github_personal_access_token
REPO_NAME=your_username/your_repo_name
```

### Getting API Keys

- **Clerk**: Sign up at [clerk.com](https://clerk.com) and create a new application
- **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Fal.ai**: Sign up at [fal.ai](https://fal.ai) and get your API key
- **Deepgram**: Create an account at [deepgram.com](https://deepgram.com) and get your API key
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your credentials
- **Neon Database**: Create a database at [neon.tech](https://neon.tech) and copy the connection string
- **GitHub PAT**: Create a personal access token with workflow permissions at [github.com/settings/tokens](https://github.com/settings/tokens)

## 🚀 Deployment <a name = "deployment"></a>

This project is set up to deploy on Vercel, which works seamlessly with Next.js.

### Getting It Live

1. **Vercel Setup**
   - Connect your GitHub repository to Vercel
   - Add all environment variables in the Vercel dashboard
   - Deploy automatically on push to main branch

2. **Environment Variables**
   - Add all the environment variables listed in the [Environment Variables](#environment_variables) section to your Vercel project settings

3. **Database Setup**
   - Ensure your Neon database is accessible from Vercel
   - Run `pnpm db:push` after deployment to set up the database schema

4. **GitHub Actions**
   - Ensure your GitHub repository has the workflow file for video rendering
   - Set up the PAT_TOKEN in your repository secrets if using GitHub Actions for rendering

5. **Custom Domain**
   - Set up your custom domain in Vercel settings if desired

The site will be live and ready to create AI-powered videos!

## ⛏️ Built Using <a name = "built_using"></a>

### Core Framework

- **Next.js 15.2.1** with App Router for the main framework
- **React 19** for the user interface
- **TypeScript** for type safety
- **Node.js** to run everything

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components (Alert Dialog, Collapsible, Dialog, Dropdown Menu, Select, Slider, Toast)
- **Lucide React** for icons
- **Next Themes** for dark/light mode support
- **Motion** for animations
- **Class Variance Authority** for component variants

### Database and ORM

- **Drizzle ORM** for database management
- **Neon PostgreSQL** for the database
- **Drizzle Kit** for database migrations

### Authentication

- **Clerk** for user authentication and management

### AI and Media Services

- **Google Gemini** (Gemini 1.5 Flash) for script generation
- **Fal.ai** (Flux Schnell) for AI image generation
- **Microsoft Edge TTS** for text-to-speech audio generation
- **Deepgram** for automatic caption generation with timing
- **Cloudinary** for media storage and delivery

### Video Rendering

- **Remotion** for video composition and rendering
- **GitHub Actions** for automated video rendering workflows

### Utilities

- **Axios** for HTTP requests
- **date-fns** for date formatting
- **jszip** for file compression
- **dotenv** for environment variable management

### Development Tools

- **ESLint** for code quality
- **TypeScript** for type checking
- **Turbopack** for fast development builds

## ✍️ Author <a name = "authors"></a>

- **ArjunCodess** - *Built and maintain Flash Reels*

**I believe** in making video creation accessible to everyone through the power of AI. If you want to collaborate or have questions, feel free to reach out.

## 🎉 Acknowledgments <a name = "acknowledgement"></a>

- **Vercel** for seamless Next.js deployment and hosting
- **shadcn/ui** for the excellent component library foundation
- **Remotion** for making programmatic video creation possible
- **Clerk** for simplifying authentication
- **All the AI service providers** (Google, Fal.ai, Deepgram, Microsoft) for their powerful APIs
- **The open source community** for the amazing tools and libraries that made this project possible

---

<div align="center">

**Flash Reels** - Reels That Wow, Made in No Time!

_Built with ❤️ for creators and content makers_

</div>

```

---

## Project: tbh

**Description:** TBH lets users receive anonymous messages and reply to them, all in one simple profile. Built with Next.js, MongoDB, and Tailwind. (Heavily inspired from NGL)

**Key Stats:** ⭐ 4 Stars | 🍴 0 Forks
**Tech Stack:** TypeScript, CSS, JavaScript
**Live Demo:** https://mytbh.vercel.app/
**Repository:** https://github.com/ArjunCodess/tbh

### README Content
```markdown
<p align="center">
  <a href="https://mytbh.vercel.app" rel="noopener">
 <img width=750px height=394px src="https://mytbh.vercel.app/dashboard.png" alt="TBH - Anonymous Q&A App"></a>
</p>

<h3 align="center">TBH - Anonymous Q&A App</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ArjunCodess/tbh.svg)](https://github.com/ArjunCodess/tbh/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ArjunCodess/tbh.svg)](https://github.com/ArjunCodess/tbh/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

</div>

---

<p align="center">
  TBH is an anonymous Q&A app where friends can send you questions, you can reply in public, make threads, and keep the fun going.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Deployment](#deployment)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

TBH is an anonymous Q&A app that lets friends ask questions without revealing their identity. Users can reply publicly, organize conversations into threads, and keep the interaction going. The app features AI-powered daily prompts, customizable profiles, and a clean, modern interface.

The main goal is to create a fun, safe space for honest conversations between friends and followers. Users get a personalized profile page where others can send anonymous questions, and they can choose to reply publicly or keep things private.

**I built it** to be fast, secure, and engaging. It uses modern web technologies with a focus on user experience and privacy. The AI integration provides contextual question suggestions, while the threading system allows for deeper conversations.

## 🏁 Let's Get You Set Up

Want to run TBH locally? Here's what you need.

### What You Need First

- Node.js version 18 or newer
- pnpm (it's like npm but faster)
- MongoDB database (local or cloud)
- Google AI API key for AI features

### Getting It Running

1. **Grab the code**

   ```bash
   git clone https://github.com/ArjunCodess/tbh.git
   cd tbh
   ```

2. **Install everything**

   ```bash
   pnpm install
   ```

3. **Set up your environment**
   Copy `.env.example` to `.env.local` and add your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

The app should be running at `http://localhost:3000`.

## 🎈 How to Use It

### What It Does

1. **Landing Page**
   Introduces TBH and showcases the main features with an interactive demo.

2. **User Profiles**
   Each user gets a personalized page at `/u/[username]` where visitors can send anonymous questions.

3. **Dashboard**
   Signed-in users can manage their questions, reply to messages, organize threads, and customize their profile.

4. **Anonymous Q&A**
   Friends can ask questions without logging in, and users can reply publicly or keep responses private.

5. **AI Features**
   Daily AI-generated prompts and contextual question suggestions to spark conversations.

6. **Threading**
   Group related questions and answers into conversation threads for better organization.

### The Q&A Flow

1. Someone visits your TBH profile page
2. They send you an anonymous question
3. You receive it in your dashboard and can choose to reply
4. Your public replies appear on your profile, creating a thread of conversation
5. Others can see the conversation and join in with follow-up questions

It's all designed to be fun, honest, and engaging while keeping anonymity when requested.

## 🔧 Built Using

### Core Stuff

- **Next.js** with the App Router for the main framework
- **React** for the user interface (version 19)
- **TypeScript** to catch errors before they happen
- **MongoDB** with Mongoose for data storage
- **NextAuth** for authentication

### AI & Features

- **Google AI (Gemini)** for generating daily prompts and question suggestions
- **AI SDK** for reliable AI integration with retry logic

### UI and Design

- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Next Themes** for dark/light mode

### Making It Work

- **Axios** for API communication
- **Vercel Analytics** for tracking usage
- **bcryptjs** for password hashing
- **Zod** for data validation

### Development Tools

- **Vercel** for hosting and deployment
- **pnpm** for managing packages
- **ESLint** to check code quality

## 🚀 Putting It Live

TBH is set up to deploy on Vercel with MongoDB Atlas for the database.

### Getting It Live

1. **Vercel Setup**
   Connect your GitHub repo to Vercel and set up the environment variables in their dashboard.

2. **Environment Variables You Need**
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   NEXTAUTH_SECRET=your_secure_random_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

3. **Database**
   Set up a MongoDB Atlas cluster and connect it to your app.

The app will be live and ready to collect anonymous questions!

## ✍️ Who Built This

- **ArjunCodess** - I built TBH and continue to work on it

I believe in open source because it keeps things honest and helps everyone get better together. If you want to collaborate or have questions, feel free to reach out.

## 🎉 Thanks to

- **Vercel** for making deployment so smooth
- **Google AI** for the Gemini API that powers the AI features
- **shadcn/ui** for great components I could build on
- **The open source community** who shares their work and makes this possible

---

<div align="center">

**TBH** - Real questions. Honest answers.

_Built with ❤️ for authentic conversations_

</div>

```

---

