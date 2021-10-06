<script>
  export let inputValue = '';
  export let items = [];
  export let onClose = () => {};
  export let onSend = () => {};

  let focusedItemIndex = null;

  function focusNext() {
    if (!items.length) {
      return;
    }

    if (focusedItemIndex === null) {
      focusedItemIndex = 0;
    } else if (focusedItemIndex === items.length - 1) {
      focusedItemIndex = null;
    } else {
      focusedItemIndex++;
    }
  }

  function focusPrevious() {
    if (!items.length) {
      return;
    }

    if (focusedItemIndex === null) {
      focusedItemIndex = items.length - 1;
    } else if (focusedItemIndex === 0) {
      focusedItemIndex = null;
    } else {
      focusedItemIndex--;
    }
  }

  function handleKeyUp(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }

    if (evt.key === 'Enter') {
      onSend(inputValue);
    }

    if (evt.key === 'ArrowDown') {
      focusNext();
    }

    if (evt.key === 'ArrowUp') {
      focusPrevious();
    }
  }

  function handleChange(evt) {
    inputValue = evt.target.value;
  }
</script>

<input autofocus value={inputValue} on:change={handleChange} class="input" on:keyup={handleKeyUp} />
<div class="items">
  {#each items as item, i}
    <div class:item class:focused={i === focusedItemIndex}>{item}</div>
  {/each}
</div>

<style>
  .item {
    font-size: 36px;
    padding: 16px;
  }

  .item.focused {
    background: #DADADA;
  }
</style>
