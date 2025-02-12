# Microservices Web Application

This repository contains a simple microservices-based web application consisting of:

- **Backend Service:** A Python Flask API that returns a simple JSON message.
- **Frontend Service:** A Node.js Express app that calls the backend API and displays the message.

Both services are containerized with Docker and deployed on Kubernetes with separate YAML manifests. A ConfigMap is used to inject environment variables (such as the backend URL) into the frontend deployment.

## Prerequisites

- **Docker:** For building container images.
- **Kubernetes Cluster:** Either a local setup (e.g., Minikube, Kind) or a cloud-based cluster.
- **kubectl:** Command-line tool to interact with your Kubernetes cluster.
- **Visual Studio Code:** (Optional) for editing and navigating the project files.
- (Optional) **Helm:** If you wish to extend this project later.

## Project Structure

```
microservices-app/
├── backend/                  # Python Flask backend service
│   ├── app.py                # Flask application code
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Dockerfile for backend
├── frontend/                 # Node.js Express frontend service
│   ├── server.js             # Express server code
│   ├── package.json          # Node.js dependencies and scripts
│   └── Dockerfile            # Dockerfile for frontend
├── k8s/                      # Kubernetes manifests
│   ├── configmap.yaml        # ConfigMap for environment variables
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
└── README.md                 # This file
```

## Setup and Build Instructions

### 1. Clone the Repository

Clone the repository into your working directory:

```bash
git clone https://github.com/your-username/microservices-app.git
cd microservices-app
```

### 2. Build Docker Images

#### Build the Backend Image

Navigate to the backend folder and build the Docker image:

```bash
cd backend
docker build -t your-docker-registry/backend:latest .
```

#### Build the Frontend Image

Navigate to the frontend folder and build the Docker image:

```bash
cd ../frontend
docker build -t your-docker-registry/frontend:latest .
```

*Note:* Replace `your-docker-registry` with your Docker Hub username or registry path. If you’re using a local Kubernetes setup like Minikube, you may build images directly in Minikube’s Docker daemon.

### 3. Push Images (If Needed)

If you are using a remote Kubernetes cluster, push your images to your registry:

```bash
docker push your-docker-registry/backend:latest
docker push your-docker-registry/frontend:latest
```

### 4. Deploy to Kubernetes

#### Apply the ConfigMap

```bash
kubectl apply -f k8s/configmap.yaml
```

#### Deploy the Backend

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

#### Deploy the Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

### 5. Access the Application

- If using a cloud provider with a LoadBalancer service, retrieve the external IP:

  ```bash
  kubectl get svc frontend-service
  ```

- For local clusters (e.g., Minikube), you can use:

  ```bash
  minikube service frontend-service
  ```

Open the provided URL in your browser to see the frontend application display the message from the backend.

### 6. Troubleshooting and Logs

- To view logs of the frontend pod:

  ```bash
  kubectl logs -l app=frontend
  ```

- To view logs of the backend pod:

  ```bash
  kubectl logs -l app=backend
  ```

## Cleanup

To delete all the deployed resources, run:

```bash
kubectl delete -f k8s/frontend-service.yaml
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/backend-service.yaml
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/configmap.yaml
```

## Conclusion

This project demonstrates a basic microservices architecture deployed on Kubernetes. You’ve learned how to build containerized applications in different languages, deploy them with separate Kubernetes manifests, and use a ConfigMap to manage environment variables for service discovery.

Feel free to extend this project further by adding more features or services.

---

Happy coding!
