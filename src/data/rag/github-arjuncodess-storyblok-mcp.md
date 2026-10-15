# GitHub README: arjuncodess/storyblok-mcp

> Repository: https://github.com/arjuncodess/storyblok-mcp
> Retrieved: 2026-10-15T06:35:15.486Z
> Technical reference snapshot. Current personal facts, achievements, and project status are maintained separately.

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
