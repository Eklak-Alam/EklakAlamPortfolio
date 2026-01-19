export const devopsProjects = {
  "chat-docker-deploy": {
    id: "chat-docker-deploy",
    slug: "dockerized-realtime-chat-deployment",
    title: "Dockerized 3-Tier Real-Time Chat Deployment",
    shortDescription: "End-to-end containerization and cloud deployment of a real-time WebSocket application using Docker Compose on AWS EC2.",
    fullDescription: "Deploying stateful, real-time applications presents a unique set of challenges compared to standard stateless REST APIs. This project involved the complete containerization and cloud deployment of a complex 3-tier chat application comprising a Next.js frontend, a Node.js/Express backend utilizing Socket.io for bidirectional communication, and a MySQL database for persistent message storage. The primary objective was to solve the classic 'it works on my machine' dilemma by creating an immutable, portable infrastructure that runs identically in development and production environments.\n\nMy approach began with architectural decoupling. I wrote custom multi-stage Dockerfiles for both the frontend and backend services. For the Node.js backend, I utilized Alpine-based images to minimize the attack surface and reduce the final image size, ensuring faster pull times on the server. The most critical technical challenge was orchestrating the internal networking between these containers. Unlike a monolithic setup, the frontend container needed to communicate with the backend API via client-side requests, while the backend needed a secure, private channel to talk to the MySQL database container. I utilized Docker Compose to define a custom bridge network, isolating the database from the public internet while allowing the backend service to access it via service discovery hostnames.\n\nFor the deployment infrastructure, I provisioned a raw AWS EC2 instance (Ubuntu). Instead of using managed services like RDS or Vercel, I opted for a self-managed approach to demonstrate deep Linux and Docker competency. I hardened the server, installed the Docker runtime, and deployed the entire stack using `docker-compose up`. This single-command deployment strategy automated the provisioning of volumes for database persistence, environment variable injection, and port mapping (exposing port 80/443 while keeping the database port 3306 private). The result was a robust, self-healing application where any component could be restarted independently without bringing down the entire system.",
    tools: [
      "AWS EC2",
      "Docker",
      "Docker Compose",
      "Docker Hub",
      "Socket.io",
      "MySQL",
      "Next.js",
      "Node.js",
      "Linux CLI"
    ],
    steps: [
      "Developed Dockerfiles for the Next.js frontend and Node.js backend, optimizing build layers for faster deployment.",
      "Configured a custom bridge network in Docker Compose to enable secure internal communication between the API and MySQL database.",
      "Built and pushed multi-architecture images to a public Docker Hub repository for easy retrieval.",
      "Provisioned an AWS EC2 instance and performed the initial environment setup, including installing Git and the Docker Engine.",
      "Executed the deployment on the cloud server by cloning the repository and running Docker Compose, successfully launching all three tiers simultaneously."
    ]
  },
  "todo-github-actions": {
    id: "todo-github-actions",
    slug: "automated-cicd-pipeline-github-actions",
    title: "Automated CI/CD Pipeline with GitHub Actions",
    shortDescription: "Implementing a GitOps workflow to fully automate the testing, building, and deployment of a 3-tier application to AWS EC2.",
    fullDescription: "In modern software engineering, manual deployments are a bottleneck and a major source of production errors. For this project, I engineered a comprehensive Continuous Integration/Continuous Deployment (CI/CD) pipeline for a 3-tier Todo application (Next.js, Node.js, MySQL) to achieve a 'Click-less Deployment' workflow. The goal was to ensure that every code merge to the main branch would automatically trigger a sequence of quality checks, builds, and updates to the live AWS EC2 server without any human intervention.\n\nI leveraged GitHub Actions as the orchestration engine. The pipeline is divided into two distinct stages: Integration and Deployment. The Integration stage runs immediately upon code push, executing linting and unit tests to ensure code quality. Once the tests pass, the pipeline builds optimized Docker images for the frontend and backend services and pushes them to the Docker Hub registry. I implemented semantic tagging strategies to keep track of build versions (`latest` vs. specific commit SHA).\n\nThe Deployment stage involved complex security configurations. I utilized GitHub Secrets to encrypted sensitive credentials, such as Docker Hub access tokens, AWS SSH keys, and host IP addresses. The pipeline uses an `appleboy/ssh-action` to securely tunnel into the EC2 instance. It then executes a script to pull the newly built images from the registry and performs a rolling restart of the services using Docker Compose. This automated approach reduced the deployment time from 15 minutes of manual work to under 2 minutes, significantly increasing the team's development velocity and ensuring that the production environment is always a faithful reflection of the codebase's stable branch.",
    tools: [
      "GitHub Actions",
      "AWS EC2",
      "Docker Hub",
      "Docker Compose",
      "SSH / SCP",
      "GitHub Secrets",
      "Linux",
      "YAML"
    ],
    steps: [
      "Designed a GitHub Actions workflow file (`.yml`) to trigger automatically on push events to the main branch.",
      "Integrated Docker Hub credentials into GitHub Secrets to allow the pipeline to authenticate and push build artifacts securely.",
      "Configured SSH access within the workflow to allow the GitHub runner to execute commands remotely on the AWS EC2 production server.",
      "Scripted the deployment logic to pull the latest Docker images and gracefully restart the Docker Compose services to minimize downtime.",
      "Validated the pipeline by committing changes and observing the automatic update of the live application."
    ]
  },
  "todo-jenkins-cicd": {
    id: "todo-jenkins-cicd",
    slug: "enterprise-jenkins-cicd-monitoring",
    title: "Enterprise Jenkins CI/CD Pipeline & Monitoring",
    shortDescription: "Deploying a self-hosted Jenkins build server on AWS to orchestrate a pipeline with automated email notifications and GitHub triggers.",
    fullDescription: "While cloud-native CI tools are popular, Jenkins remains the industry standard for enterprise-grade, highly customizable automation. This project involved provisioning and managing a self-hosted Jenkins infrastructure on AWS EC2 to orchestrate the lifecycle of a full-stack application. Unlike managed services where the environment is abstract, I had to manually configure the build server, install the Java runtime, manage plugins, and secure the instance using AWS Security Groups to allow traffic only on port 8080.\n\nI adopted the 'Pipeline as Code' philosophy by writing a declarative `Jenkinsfile` stored in the root of the project repository. This file defines the entire build pipeline in stages: Checkout, Build, Test, Push, and Deploy. I configured GitHub Webhooks to create an event-driven architecture; whenever a developer pushes code, GitHub sends a payload to the Jenkins server, instantly triggering the build process. The pipeline handles Docker image creation and pushes artifacts to a private registry.\n\nA key focus of this project was Observability and Feedback. In a professional setting, developers need immediate feedback if a build fails. I integrated the Jenkins pipeline with an SMTP server (using Gmail relay) to send automated email notifications. If a build passes, the team is notified of a successful deployment; if it fails (e.g., due to a failed test or Docker build error), the email includes the build logs for rapid debugging. This setup mimics a robust corporate DevOps environment where infrastructure ownership, security, and immediate alerting are non-negotiable requirements.",
    tools: [
      "Jenkins",
      "AWS EC2",
      "Groovy (Jenkinsfile)",
      "Docker",
      "GitHub Webhooks",
      "SMTP (Email Alerts)",
      "Java",
      "Linux"
    ],
    steps: [
      "Provisioned an EC2 instance and installed Jenkins, Java, and Docker, configuring the necessary security groups for port 8080 access.",
      "Created a `Jenkinsfile` within the codebase to define the build, test, and deploy stages programmatically.",
      "Configured GitHub Webhooks to send payload data to the Jenkins server, triggering builds automatically on code commits.",
      "Set up credentials management within Jenkins to securely handle Docker Hub login and AWS SSH keys.",
      "Implemented a 'Post-Build Action' using SMTP to send email notifications with build logs to the team in case of pipeline failure or success."
    ]
  },
  "terraform-repo-auto": {
    id: "terraform-repo-auto",
    slug: "iac-terraform-github-automation",
    title: "Infrastructure as Code: Automated Repo Provisioning",
    shortDescription: "Automating developer workflows using Terraform to programmatically create GitHub repositories and push boilerplate code.",
    fullDescription: "Infrastructure as Code (IaC) is typically associated with provisioning servers, but its principles apply equally well to Developer Experience (DevEx) and workflow automation. I developed this Terraform project to solve the repetitive, error-prone process of 'Day 0' project setup. Manually creating a GitHub repository, setting visibility, initializing a local Git folder, creating boilerplate HTML/CSS/JS files, and linking the remote origin is a tedious process that breaks developer flow. I automated this entire sequence using Terraform and the GitHub Provider.\n\nThe project uses HashiCorp Configuration Language (HCL) to define the desired state of a GitHub repository. I utilized sensitive input variables to securely handle Personal Access Tokens (PAT) for authentication with the GitHub API. Beyond just creating the repository, I leveraged Terraform's `local-exec` provisioners to bridge the gap between cloud API calls and local machine operations. These provisioners execute local Bash commands to initialize Git, generate the starter code files, stage them, commit them, and push them to the newly created remote origin.\n\nThis project serves as a powerful demonstration of how IaC tools can be used to standardize engineering practices. By running a single command—`terraform apply`—I can provision a fully configured project environment in seconds. This ensures consistency across projects, enforcing standard naming conventions and repository settings (like public/private visibility) programmatically, rather than relying on manual clicks in a UI.",
    tools: [
      "Terraform",
      "HCL (HashiCorp Configuration Language)",
      "GitHub API / Provider",
      "Git CLI",
      "Bash",
      "VS Code"
    ],
    steps: [
      "Configured the Terraform GitHub Provider and defined variables to securely handle Personal Access Tokens (PAT).",
      "Wrote HCL resources to define the desired state of the GitHub repository (name, description, visibility).",
      "Implemented `local-exec` provisioners within Terraform to execute shell commands that initialize Git and commit boilerplate code locally.",
      "Chained commands to automatically push the local codebase to the newly created remote repository immediately after provisioning.",
      "Verified the automation by running `terraform apply`, which instantly created the repo and populated it with code."
    ]
  },
  "vortex-cicd": {
    id: "vortex-cicd",
    slug: "vortex-fullstack-devops-pipeline",
    title: "Vortex: Full-Stack DevOps Ecosystem with Automated CI/CD",
    shortDescription: "A production-grade full-stack application orchestrated via Docker and Nginx, featuring a zero-downtime CI/CD pipeline powered by Jenkins on AWS.",
    fullDescription: "Moving a full-stack application from 'localhost' to a live production server is often where development stops and engineering begins. I built Vortex not just as a web app, but as a complete demonstration of a modern DevOps lifecycle. The core application consists of a high-performance Next.js 14 frontend and a robust Java Spring Boot backend, but the real engineering challenge was orchestrating these services in a secure, automated cloud environment.\n\nI tackled the classic 'works on my machine' problem by containerizing the entire stack using Docker and Docker Compose. To bridge the gap between development and production, I engineered a custom CI/CD pipeline using Jenkins hosted on an AWS EC2 instance. This pipeline automatically detects code changes via GitHub Webhooks, builds the Docker images, injects dynamic environment variables (like the server's public IP) during the build process, and deploys the new version without manual intervention.\n\nA major hurdle was managing networking and security. Exposing raw ports like 3000 and 8081 is insecure and unprofessional. I solved this by implementing Nginx as a Reverse Proxy. Nginx sits at the edge (Port 80), routing traffic internally to the correct containers while handling CORS and headers. This setup allows for a clean, production-ready URL structure while keeping the backend logic isolated from the public internet.",
    tools: [
      "Next.js 14",
      "Java Spring Boot 3",
      "Docker & Docker Compose",
      "Jenkins (CI/CD)",
      "Nginx (Reverse Proxy)",
      "AWS EC2",
      "MySQL",
      "Groovy (Jenkinsfile)"
    ],
    steps: [
      "Developed a decoupled full-stack architecture with a Next.js frontend and Spring Boot REST API backed by MySQL.",
      "Containerized all services using optimized Dockerfiles (Multi-stage builds) to ensure consistency across environments.",
      "Provisioned an AWS EC2 instance and configured a Jenkins server to act as the central automation hub.",
      "Wrote a Groovy-based `Jenkinsfile` that auto-detects the server IP and injects it into the frontend build, solving dynamic environment issues.",
      "Implemented Nginx as a reverse proxy to unify the frontend and backend under a single port (80) and secure the internal architecture.",
      "Configured GitHub Webhooks to trigger the pipeline automatically on every push to the `main` branch."
    ]
  }
};

export const allDevOpsProjects = Object.values(devopsProjects);