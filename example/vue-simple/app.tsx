import Vue from 'vue';
import { withHooks } from 'vue-hooks';
import { useStore } from '@piex-store/vue';

import githubStore from './store';

const Star = withHooks((h) => {
  const store = useStore(githubStore);
  console.log('Star function component render');

  return (
    <p>
      {store.state.star ?
        (
          <button onClick={() => store.unStar()}>UnStar</button>
        )
        :
        (
          <button onClick={() => store.star()}>Star</button>
        )
      }
    </p>
  );
});


const Github = withHooks(h => {
  const store = useStore(githubStore);
  console.log('Github function component render');

  return (
    <div>
      <p>{`Star：${store.state.star}`}</p>
      <p>Issue：{store.state.issue}</p>
      <Star />
    </div>
  );
});

new Vue({
  el: '#app',
  render: (h) => h(Github),
});
