import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function InputSearch({handleBuscar, placeholder, handleSetPalabra}) {

  function handleButton(){
    handleBuscar();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  }

  return (
    <Paper
      className='input-search'      
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => handleSetPalabra(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}