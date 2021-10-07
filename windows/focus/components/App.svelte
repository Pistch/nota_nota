<script>
  export let focusedItem = '';
  export let onClose = () => {};
</script>

<div class="wrapper">
  <span>{focusedItem}</span>
</div>

<style>
  .wrapper {
    padding: 16px;
    font-size: 24px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
