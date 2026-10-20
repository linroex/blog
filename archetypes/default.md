+++
{{- $name := .Name }}
{{- $slug := $name }}
{{- if not (findRE `^[a-z0-9]+(-[a-z0-9]+)*$` $name) }}
{{- $slug = printf "post-%s" (dateFormat "20060102-150405" .Date) }}
{{- warnf "post name %q is not ASCII; slug set to %q, rename the folder and slug before publishing" $name $slug }}
{{- end }}
date = '{{ .Date }}'
draft = true
slug = '{{ $slug }}'
title = '{{ replace $name "-" " " | title }}'
+++
