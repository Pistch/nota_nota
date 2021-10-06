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
      focusedItemIndex = 0;
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
      focusedItemIndex = items.length - 1;
    } else {
      focusedItemIndex--;
    }
  }

  function focusItem(index) {
    if (!items[index]) {
      return;
    }

    focusedItemIndex = index;
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

<input
  autofocus
  value={inputValue}
  on:change={handleChange}
  on:keyup={handleKeyUp}
  on:blur|self={evt => evt.target.focus()}
  class="input"
/>
<div class="items">
  {#each items as item, i}
    <div class:item class:focused={i === focusedItemIndex} on:click={() => focusItem(i)}>{item}</div>
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
