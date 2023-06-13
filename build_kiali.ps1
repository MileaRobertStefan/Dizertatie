helm install `
  --namespace default `
  --set auth.strategy="anonymous" `
  --repo https://kiali.org/helm-charts `
  kiali-server `
  kiali-server

kubectl port-forward svc/kiali 20001:20001