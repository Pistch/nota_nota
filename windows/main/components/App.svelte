<script>
  export let inputValue = '';
  export let items = [];
  export let onClose = () => {};
  export let onSend = () => {};

  function handleKeyUp(event) {
    if (event.key === 'Escape') {
      onClose();
    }

    if (event.key === 'Enter') {
      onSend(inputValue);
    }
  }

  function handleChange(evt) {
    inputValue = evt.target.value;
  }
</script>

<input autofocus value={inputValue} on:change={handleChange} class="input" on:keyup={handleKeyUp} />
<div class="items">
  {#each items as item}
    <div>{item}</div>
  {/each}
</div>
