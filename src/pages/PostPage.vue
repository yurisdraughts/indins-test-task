<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import NewCommentForm from '../components/NewCommentForm.vue'

const props = defineProps(['postId'])

const post = ref()
const user = ref()
const comments = ref()

async function getPost(postId) {
  post.value = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then((response) => response.json())
}

async function getUser(userId) {
  user.value = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((response) => response.json())
}

async function getComments(postId) {
  comments.value = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((response) => response.json())
}

getPost(props.postId)

watch(post, (currentPost) => {
  if (typeof currentPost.userId !== 'undefined') {
    getUser(currentPost.userId)
  }

  if (typeof currentPost.id !== 'undefined') {
    getComments(currentPost.id)
  }
})
</script>

<template>
  <Transition appear>
    <article class="post" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>
        {{ post.body }}
      </p>
      <Transition appear>
        <address class="post__address" v-if="user">
          <p class="post__contact">
            <RouterLink :to="'/user/' + user.id"
              >{{ user.name }}
              <span class="post__username"
                >@{{ user.username }}</span
              ></RouterLink
            >
          </p>
          <p class="post__contact">
            <a :href="'https://' + user.website" target="_blank">{{
              user.website
            }}</a>
          </p>
          <p class="post__contact">
            <span class="select-all">{{ user.phone }}</span>
          </p>
          <p class="post__contact">
            <span class="select-all">{{ user.email }}</span>
          </p>
        </address>
      </Transition>
    </article>
  </Transition>
  <Transition appear>
    <section class="comment__wrapper" v-if="comments">
      <h2>Comments:</h2>
      <NewCommentForm :postId="props.postId" :comments="comments" />
      <article class="comment" v-for="comment in comments">
        <h3>{{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
        <address class="comment__address">
          <span class="select-all">{{ comment.email }}</span>
        </address>
      </article>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.comment {
  margin-bottom: 1rem;
  border-top: 2px dotted var(--light-gray);

  &__address {
    margin-top: 0.8rem;
  }

  &__wrapper {
    border-top: 4px dotted var(--dark-blue);
  }
}

.post {
  margin-bottom: 2.3rem;
  font-size: 1.2em;

  &__address {
    margin: 1em 0 0 1.5em;
    font-size: 0.7rem;
  }

  &__contact:not(:last-child) {
    margin-bottom: 0.2em;
  }

  &__username {
    color: var(--light-gray);
    transition: inherit;

    @media (prefers-color-scheme: dark) {
      color: var(--dark-blue);
    }
  }

  a:hover > &__username {
    color: inherit;
  }
}

.select-all {
  font-style: italic;
  user-select: all;
}

.v-enter-active,
.v-leave-active {
  transition: var(--transition);
}

.v-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
