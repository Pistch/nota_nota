<script>
  export let inputValue = '';
  export let focusedItem = '';
  export let items = [];
  export let onClose = () => {};
  export let onSend = () => {};
  export let onFocus = () => {};
  export let onDelete = () => {};

  let selectedItemIndex = null;

  function selectNext() {
    if (!items.length) {
      return;
    }

    if (selectedItemIndex === null) {
      selectedItemIndex = 0;
    } else if (selectedItemIndex === items.length - 1) {
      selectedItemIndex = 0;
    } else {
      selectedItemIndex++;
    }
  }

  function selectPrevious() {
    if (!items.length) {
      return;
    }

    if (selectedItemIndex === null) {
      selectedItemIndex = items.length - 1;
    } else if (selectedItemIndex === 0) {
      selectedItemIndex = items.length - 1;
    } else {
      selectedItemIndex--;
    }
  }

  function selectItem(index) {
    if (!items[index]) {
      return;
    }

    selectedItemIndex = index;
  }

  function handleKeyUp(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }

    if (evt.key === 'Enter') {
      onSend(inputValue);
    }

    if (evt.key === 'ArrowDown') {
      selectNext();
    }

    if (evt.key === 'ArrowUp') {
      selectPrevious();
    }
  }

  function handleKeyDown(evt) {
    if (!evt.metaKey) {
      return;
    }

    const selectedItem = items[selectedItemIndex];

    if (evt.keyCode === 70) {
      if (focusedItem === selectedItem) {
        onFocus(null);
      } else if (selectedItem) {
        onFocus(selectedItem);
      }
    }

    if (evt.key === 'Delete' || evt.key === 'Backspace') {
      onDelete(selectedItem);
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
  on:keydown={handleKeyDown}
  on:blur|self={evt => evt.target.focus()}
  class="input"
/>
<div class="items">
  {#each items as item, i}
    <div class:item class:selected={i === selectedItemIndex} on:click={() => selectItem(i)}>
      <span>{item}</span>
      {#if focusedItem === item}
        <span>F</span>
      {/if}
    </div>
  {/each}
</div>

<style>
  .items {
    display: flex;
    flex-direction: column;
  }

  .item {
    font-size: 36px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
  }

  .item.selected {
    background: #DADADA;
  }
</style>
