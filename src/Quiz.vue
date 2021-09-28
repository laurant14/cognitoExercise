<template>
  <div>
    <img src="./assets/images/cognitoFormsLogo.png" />
    <div class="yaldevi"><h1>QUIZ</h1></div>
    <div id="quiz">
      <p v-if="!startSeen">
        Count is equal to
        <!--this should be the index of the question in the array-->
        {{ questCount }}
        : Please choose the best answer:
      </p>
      <div
        v-for="(question, index) in questions"
        :key="index"
        v-show="!isSameCount"
      >
        <!--must change to check if the count is the same-->
        <Question :question="question" />
      </div>

      <!--hide until last question/count=last index of questions array-->
    </div>
    <button class="raleway" v-if="startSeen" @click="stopSeen">
      Start Quiz
    </button>
    <button class="raleway" @click="count" v-if="!startSeen">
      Next Question
    </button>
    <button class="raleway" v-if="submitSeen">Submit Quiz</button>
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
  background-color: rgb(231, 104, 20);
  border-radius: 0px;
  border-color: white;
  color: white;
  font-size: 1.5rem;
}

#quiz {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 60px;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 750px;
  color: rgb(3, 20, 77);
  background-color: rgb(218, 250, 248);
}

h1 {
  font-size: 4rem;
  font-style: italic;
  text-align: center;
  color: rgb(231, 104, 20);
}
.dosis {
  font-family: "Dosis", sans-serif;
}
.indieFlower {
  font-family: "Indie Flower", sans-serif;
}
.yaldevi {
  font-family: "Yaldevi", sans-serif;
  font-weight: 200;
}
.raleway {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
}
</style>