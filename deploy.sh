docker build -t vikassuresh/multi-client:latest -t vikassuresh/multi-client:$SHA ./client
docker build -t vikassuresh/multi-server:latest -t vikassuresh/multi-server:$SHA ./server
docker build -t vikassuresh/multi-worker:latest -t vikassuresh/multi-worker:$SHA ./worker

docker push vikassuresh/multi-client:latest
docker push vikassuresh/multi-server:latest
docker push vikassuresh/multi-worker:latest
docker push vikassuresh/multi-client:$SHA
docker push vikassuresh/multi-server:$SHA
docker push vikassuresh/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=vikassuresh/multi-server:$SHA
kubectl set image deployments/client-deployment client=vikassuresh/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=vikassuresh/multi-worker:$SHA