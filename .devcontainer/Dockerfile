FROM node:22.4-alpine3.19

ARG USERNAME=node
ARG HOME_DIR=/home/$USERNAME

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories \
    && apk update \
    && apk upgrade \
    && apk add -q --update --progress --no-cache bash coreutils curl \
    docker-cli docker-compose g++ git jq make ncurses openssh-client py3-pip python3 sudo \
    vim vim-doc zsh zsh-vcs
    
RUN addgroup docker && adduser $USERNAME docker \
    && mkdir -p /etc/sudoers.d \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME
WORKDIR $HOME_DIR

RUN curl -fsSL https://d2lang.com/install.sh | sh -s -- --dry-run \
    && curl -fsSL https://d2lang.com/install.sh | sh -s -- \
    && curl -fsSL https://getmic.ro | bash && sudo mv micro $HOME_DIR/.local/bin/

# Install Oh-My-Zsh
RUN curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | bash \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions

# Install the Powerlevel10k theme
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $HOME_DIR/.oh-my-zsh/custom/themes/powerlevel10k

COPY .p10k.zsh .zshrc $HOME_DIR/

RUN dos2unix ~/.p10k.zsh && dos2unix ~/.zshrc

SHELL ["/bin/zsh", "-c"]

CMD ["sleep", "infinity"]