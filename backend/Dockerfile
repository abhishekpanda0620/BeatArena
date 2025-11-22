# Stage 1: Build Dependencies
FROM composer:latest AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --no-dev \
    --prefer-dist

# Stage 2: Production Image
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    mysql-client \
    shadow

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Create non-root user
RUN groupadd -g 1000 www && \
    useradd -u 1000 -ms /bin/bash -g www www

# Set working directory
WORKDIR /var/www

# Copy vendor files from previous stage
COPY --from=vendor /app/vendor /var/www/vendor
COPY . /var/www

# Set permissions
RUN chown -R www:www /var/www

# Switch to non-root user
USER www

EXPOSE 9000

CMD ["php-fpm"]
