# Use the official Nginx Alpine image for a lightweight production server
FROM nginx:alpine

# Copy static assets into the Nginx default html directory
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
