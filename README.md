<div style="text-align: center">
    <a href="https://ps.souup.org"><img alt="Placing Something Logo" src="./readme_assets/ps_banner_light.png" style="width:256px"/></a>
</div>

## Introduction
Placing Something is a crowdsourced ranking web application for abstract user-generated terms ("somethings").

* Web service powered by the [Deno](https://deno.land) run-time & the [Fresh](https://fresh.deno.dev/) framework for [Deno](https://deno.land) 
    - Interface styled with [Tailwind](https://tailwindcss.com/)
    - Uses [TypeScript](https://www.typescriptlang.org/) internally
* [Redis](https://redis.io/) used for term persistent storage and questionnaire session cache
* Deployed using [Alpine Linux](https://www.alpinelinux.org/), [Docker](https://www.docker.com/) and [Railway](https://railway.app/)

## Local Development
Run `deno task start` after starting a local Redis instance accessible via 127.0.0.1:6379.

## Authors
- **Ethan Standafer** - [GitHub](https://github.com/standafer) - [Email](mailto:ethans262@mitacademy.org?subject=Placing%20Something)

## License
Placing Something is licensed under [GPL-3.0](/LICENSE).