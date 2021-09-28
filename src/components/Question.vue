<template>
  <div class="question">
    <div>Question: {{ question.text }}</div>
    <div>Answers: {{ question.answers }}</div>
    <!-- this will be array of answers-->
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
    },
  },
};
</script>