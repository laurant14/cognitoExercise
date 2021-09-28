<template>
  <div>
    <div id="quiz">
      <p class="dosis" v-if="!startSeen">
        Count is equal to
        <!--this should be the index of the question in the array-->
        {{ questCount }}
        : Please choose the best answer:
      </p>
      <div
        class="dosis"
        v-for="(question, index) in questions"
        :key="index"
        v-show="!fisSameCount"
      >
        <!--must change to check if the count is the same-->
        <Question :question="question" />
      </div>

      <button v-if="startSeen" @click="stopSeen">Start Quiz</button>
      <button @click="count" v-if="!startSeen">Next Question</button>
      <button v-if="submitSeen">Submit Quiz</button
      ><!--hide until last question/count=last index of questions array-->
    </div>
  </div>
</template>

<script>
import Question from "./components/Question.vue";

export default {
  name: "App",
  components: {
    Question,
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      startSeen: true,
      questCount: 0,
      submitSeen: false,
      isSameCount: false,
    };
  },
  methods: {
    count: function () {
      this.questCount++;
    },
    stopSeen: function () {
      this.startSeen = false;
    },
    checkCount: function (index) {
      if (index === this.questCount) {
        this.isSameCount = true;
      } else {
        this.isSameCount = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: rgb(22, 167, 211);
  border-radius: 0px;
  border-color: rgb(22, 167, 211);
  color: white;
  font: oblique;
}

#quiz {
  font-family: "Poiret One", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(231, 104, 20);
  background-color: peachpuff;
}

h1 {
  font-size: 2rem;
  padding: 0rem;
  color: rgb(231, 104, 20);
}
.dosis {
  font-family: "Dosis", sans-serif;
}
.indieFlower {
  font-family: "Indie Flower", sans-serif;
}
</style>