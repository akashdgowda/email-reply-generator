import { useState } from 'react'
import { Container, FormControl, Menu,MenuItem, Select, Typography, Box, TextField, InputLabel, Button, CircularProgress } from '@mui/material'; // Add this line
import axios from 'axios'; 
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

    } catch (error) {
      setError('Something went wrong');
      console.error(error);
    } finally{
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant="h4" component="h1" align='center' gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{mx:3}}>
        <TextField
          fullWidth
          label="Email Content"
          multiline
          rows={6}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb:2}}/>

          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel>Tone(Optional)</InputLabel>
            <Select
              value={tone || ''}
              label={"Tone(Optional)"}
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
          </Button>
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{mb:2}}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant="h6" component="h2" align='center' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
          fullWidth
          multiline
          rows={6}
          varient="outlined"
          value={generatedReply || ''}
          inputProps={{readOnly: true}}
          />
          <Button
          varient="controlled"
          sx={{mt:2}}
          onClick={() => navigator.clipboard.writeText(generatedReply)}>
            
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default App