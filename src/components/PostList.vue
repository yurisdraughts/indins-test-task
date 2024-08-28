<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps(['posts', 'users', 'currentUser'])

const usersById = ref(new Map())

watch(
  () => props.users,
  () => {
    for (const user of props.users) {
      usersById.value.set(user.id, user.name)
    }
  }
)
</script>

<template>
  <Transition appear mode="out-in" name="posts">
    <ul class="posts" :key="currentUser">
      <li v-for="post in posts" :key="post.id">
        <article>
          <h2 class="posts__title">
            <RouterLink :to="'/post/' + post.id">{{ post.title }}</RouterLink>
          </h2>
          <p class="posts__author" v-if="!currentUser">
            by
            <RouterLink :to="'/user/' + post.userId">{{
              usersById.get(post.userId)
            }}</RouterLink>
          </p>
        </article>
      </li>
    </ul>
  </Transition>
</template>

<style scoped lang="scss">
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;

  &__author {
    color: var(--light-gray);

    @media (prefers-color-scheme: dark) {
      color: var(--dark-blue);
    }
  }

  &__title {
    text-wrap: balance;
  }

  &-enter-active,
  &-leave-active {
    transition: var(--transition);
  }

  &-leave-active {
    transition-duration: 0ms;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(2rem);
  }
}
</style>
