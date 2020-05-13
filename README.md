 kubectl annotate ns default linkerd.io/inject=enabled
 
 kubectl rollout restart deploy -n default