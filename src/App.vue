<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink class="header__home-link" to="/">
        <img
          class="header__logo"
          src="/logo.svg"
          alt="Логотип сайта: схематичный рисунок дома"
          width="72"
          height="72"
        />
      </RouterLink>
    </div>
  </header>
  <div class="container container_main">
    <RouterView />
  </div>
  <footer class="footer">
    <div class="container">
      Тестовая работа для <a href="https://indins.ru/">"ИНДИНС"</a>;
      <span class="footer__name">Матвеев Юрий</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  width: 100%;
  max-width: 1280px;

  &_main {
    margin-bottom: auto;
  }

  @media (min-width: 1024px) {
    margin-inline: auto;
    padding-inline: 0;
    max-width: 940px;
  }
}

.footer,
.header {
  background-color: #f6f6f6;

  @media (prefers-color-scheme: dark) {
    background-color: var(--dark-blue);
  }
}

.footer {
  text-align: right;

  &__name {
    font-style: italic;
  }
}

.header {
  &__logo {
    display: block;
  }

  &__home-link {
    display: block;
    position: relative;
    top: 0;
    transition: var(--transition);
    width: fit-content;

    &:hover,
    &:active {
      top: -2px;
    }
  }
}
</style>
