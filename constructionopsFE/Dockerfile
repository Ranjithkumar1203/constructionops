FROM node:14

WORKDIR /app

COPY /constructionopsFE . .

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm use 14 \
    && npm install -g @angular/cli \
    && npm install rxjs \
    && npm install rxjs-compat \
    && npm i --only=dev \
    && ng build --output-hashing=all \
    && echo "build complete"

EXPOSE 4200

CMD ["ng serve --prod --host 0.0.0.0"]

