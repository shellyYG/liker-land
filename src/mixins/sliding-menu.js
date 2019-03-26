import { mapActions, mapGetters } from 'vuex';

import SlidingMenu from '~/components/SlidingMenu';

export default {
  components: {
    SlidingMenu,
  },
  computed: {
    ...mapGetters(['getIsSlidingMenuOpen']),
  },
  head() {
    return {
      htmlAttrs: {
        'sliding-menu': this.getIsSlidingMenuOpen ? 'opened' : 'closed',
      },
    };
  },
  beforeDestroy() {
    this.toggleClickListener(false);
  },
  watch: {
    getIsSlidingMenuOpen(isOpened) {
      this.toggleClickListener(isOpened);
    },
  },
  methods: {
    ...mapActions(['toggleSlidingMenu']),

    toggleClickListener(isOn) {
      window[`${isOn ? 'add' : 'remove'}EventListener`](
        'click',
        this.onWindowClick,
        true
      );
    },

    // Dismiss the sliding menu when there is a click event outside it
    onWindowClick(e) {
      if (!this.getIsSlidingMenuOpen) return;

      const component = this.$refs.slidingMenu;
      const isClickedOutside = component && !component.$el.contains(e.target);
      if (isClickedOutside) {
        // Intercept the event to menu button that preventing the action
        e.stopPropagation();
        this.toggleSlidingMenu(false);
      }
    },
  },
};
