<script setup>
import { RouterLink } from 'vue-router'
defineProps(['users'])
</script>

<template>
  <Transition appear name="users">
    <nav>
      <ul class="users">
        <li>
          <RouterLink
            to="/"
            class="users__link users__link_main"
            activeClass="users__link_active"
            >Все посты</RouterLink
          >
        </li>
        <li v-for="user in users" :key="user.id">
          <RouterLink
            :to="'/user/' + user.id"
            class="users__link"
            activeClass="users__link_active"
            >{{ user.name }}</RouterLink
          >
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<style scoped lang="scss">
.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 5px;
  text-align: center;

  &__link {
    display: block;
    padding: 0.5em 1em;
    width: 100%;
    height: 100%;

    &_main {
      border: 1px solid var(--dark-blue);
      background-color: #ebebeb;

      @media (prefers-color-scheme: dark) {
        color: var(--dark-blue);
      }
    }

    &_active {
      color: var(--white);
      background-color: var(--dark-blue);
      cursor: pointer;
      pointer-events: none;
    }
  }

  &-enter-active,
  &-leave-active {
    transition: var(--transition);
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(2rem);
  }

  @media (min-width: 768px) {
    text-align: initial;
  }
}
</style>
