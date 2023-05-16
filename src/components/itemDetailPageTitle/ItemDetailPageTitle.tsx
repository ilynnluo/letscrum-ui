import React, { useEffect, useRef, useState } from 'react'
import {
  PestControl, ErrorOutlined, ContactMailOutlined, ClearOutlined, AccountCircle, ForumOutlined,
  Clear, Add, Save, Undo, Refresh, MoreHoriz, HourglassBottom, Brightness1, OpenInFull, ExpandMore, ExpandLess
} from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputBase, MenuItem, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { blue, grey, red } from '@mui/material/colors'
import { useAppSelector } from '../../redux/hooks'
import { selectProjectMembers } from '../../redux/reducers/projectSlice'
import styled from '@emotion/styled'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './ItemDetailPageTitle.module.css'
import { selectUserName } from '../../redux/reducers/userSlice'

const TitleInput = styled(TextField)({
  marginY: '.5rem',
  width: '98%',
  '& .MuiInputBase-root': {
    borderRadius: '0',
    height: '3rem',
    lineHeight: '3rem',
    color: grey[600]
  },
  '& .MuiInputBase-input': {
    padding: '0 0 0 .5rem'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'white'
    },
    '&:hover fieldset ': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: grey[200]
    },
    '& .Mui-focused fieldset': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: blue[600]
    }
  }
})

const CommentButton = styled(Button)({
  marginLeft: '.75rem',
  padding: '0',
  '&:hover': {
    backgroundColor: 'white',
    textDecoration: 'underline',
    textDecorationColor: grey[800]
  },
  '& .MuiButton-startIcon': {
    margin: '0 .25rem 0 0'
  }
})

const AddTagButton = styled(Button)({
  marginLeft: '.75rem',
  padding: '.125rem',
  backgroundColor: blue[50],
  borderRadius: '0',
  '&:hover': {
    backgroundColor: blue[100]
  }
})

const AddTag = styled(Autocomplete)({
  width: '10rem',
  '& .MuiInputBase-input': {
    padding: '0'
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiAutocomplete-input': {
      padding: '0'
    }
  },
  '& .Mui-focused': {
    padding: '0 0 0 .125rem'
  }
})

const AddTagInput = styled(TextField)({
  marginLeft: '.75rem',
  height: '1.315rem',
  backgroundColor: blue[50],
  '& .MuiInputBase-input': {
    padding: '0 0 0 .125rem'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '0',
      borderColor: grey[300]
    },
    '&:hover fieldset': {
      borderColor: grey[300]
    },
    '&.Mui-focused fieldset': {
      borderColor: grey[300]
    }
  }
})

const GeneralDisableOptionButton = styled(IconButton)({
  margin: '0 .5rem 0 0',
  borderRadius: '0',
  padding: '.125rem'
})

const StateText = styled(Typography)({
  display: 'block',
  width: '4rem',
  fontSize: '.75rem',
  color: grey[500]
})

// following codes have the same effect
// const StateSelect = styled(Select)({
//   borderRadius: '0',
//   '& .MuiOutlinedInput-input': {
//     padding: '0'
//   },
//   '&:hover': {
//     backgroundColor: 'white'
//   }
// })

const StateInput = styled(InputBase)({
  width: '100%',
  height: '1.625rem',
  '& .MuiInputBase-input': {
    padding: '0 0 0 .25rem',
    fontSize: '.875rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: grey[100],
    borderRadius: '0',
    '&:hover': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: grey[300],
      backgroundColor: 'white'
    }
  }
})

const SecondRow = styled(Stack)({
  padding: '0 1rem 1rem 1rem',
  alignItems: 'center'
})

const StateItem = styled(MenuItem)({
  fontSize: '.75rem'
})

const StateSuggestion = styled(Box)({
  padding: '0 0 .5rem .25rem',
  fontSize: '.75rem',
  color: blue[700]
})

const DetailItemContainer = styled(Stack)({
  padding: '.875rem 0 .875rem 1.25rem'
})

const ItemTitleText = styled(Typography)({
  marginRight: 'auto',
  paddingBottom: '.25rem',
  fontWeight: '700'
})

const ItemTitleOption = styled(Stack)({
  display: 'flex',
  alignItems: 'center'
})

const ItemTitleContainer = styled(Stack)({
  '&:hover': {
    color: blue[700],
    cursor: 'pointer'
  }
})

const FullScreenIcon = styled(OpenInFull)({
  marginLeft: 'auto',
  width: '.875rem',
  height: '.875rem',
  color: grey[800],
  '&:hover': {
    color: blue[700],
    cursor: 'pointer'
  }
})

const ShowEditorIcon = styled(ExpandLess)({
  marginLeft: '.125rem',
  width: '.875rem',
  height: '.875rem',
  color: grey[800],
  '&:hover': {
    color: blue[700],
    cursor: 'pointer'
  }
})

const CloseEditorIcon = styled(ExpandMore)({
  marginLeft: '.125rem',
  width: '.875rem',
  height: '.875rem',
  color: grey[800],
  '&:hover': {
    color: blue[700],
    cursor: 'pointer'
  }
})

const DetailItemTitle = styled(Typography)({
  fontSize: '.75rem',
  color: grey[600]
})

const DetailAutoCompleteInput = styled(InputBase)({
  display: 'inline-block',
  width: '100%',
  '& input': {
    padding: '.125rem 0 .125rem  .25rem',
    fontSize: '.875rem',
    color: grey[600],
    border: '1px solid white',
    '&:hover': {
      border: `1px solid ${grey[200]}`
    },
    '&:focus': {
      border: `1px solid ${blue[600]}`
    }
  }
})

const DetailAutocompleteItem = styled(Typography)({
  fontSize: '.75rem',
  color: grey[600]
})

const SelectSeverity = styled(InputBase)({
  fontSize: '.875rem',
  color: grey[600],
  '& .MuiInputBase-input': {
    border: '1px solid white',
    borderRadius: '0',
    '&:hover': {
      border: `1px solid ${grey[200]}`
    },
    '&:focus': {
      border: `1px solid ${blue[600]}`
    }
  },
  '& .MuiSelect-select': {
    padding: '0 0 0 .125rem'
  }
})

const SeverityItem = styled(MenuItem)({
  fontSize: '.75rem',
  color: grey[600]
})

const formats = [
  'bold',
  'italic'
]

const QuillToolbar = (): JSX.Element => (
  <div id='toolbar' style={{ border: 'none' }}>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
    </span>
  </div>
)

const modules = {
  toolbar: {
    container: '#toolbar'
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
}

const priority = ['1', '2', '3', '4']
const severity = ['1 - Critical', '2 - High', '3 - Medium', '4 - Low']

export const ItemDetailPageTitle: React.FC = () => {
  const userName = useAppSelector(selectUserName)
  const name = userName ?? ''
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState<any>(null)
  const [originalTitle, setOriginalTitle] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const handleTitle = (e: any): void => setTitle(e.currentTarget.value)
  const members: any = useAppSelector(selectProjectMembers)
  const [countComments, setCountComments] = useState(0)
  const [addFocus, setAddFocus] = useState(false)
  const tags = ['sports', 'art', 'math', 'science']
  const handleAddBlur = (): void => setAddFocus(false)
  const [selectedTag, setSelectedTag] = useState<any>('')
  const [selectedTagsArray, setSelectedTagsArray] = useState<string[]>([])
  const [showEditor, setShowEditor] = useState(true)
  const handleShowEditor = (): void => setShowEditor(!showEditor)
  const reactQuill = useRef<any>(null)
  const [editorFocus, setEditorFocus] = useState(false)
  const [editorValue, setEditorValue] = useState<any>()
  const handleEditorFoucs = (): void => setEditorFocus(true)
  const handleEditorBlur = (): void => setEditorFocus(false)
  const handleEditorValue = (content: any, delta: any, source: any, editor: any): void => setEditorValue(editor.getHTML())
  const [showDetails, setShowDetails] = useState(true)
  const handleShowDetails = (): void => setShowDetails(!showDetails)
  const [severityValue, setSeverityValue] = useState('')
  const handleSeverityValue = (e: SelectChangeEvent): void => setSeverityValue(e.target.value)
  const handleSave = async (param: { title: string }): Promise<void> => {
    setSaveLoading(true)
    try {
      const response = await axios.put('http://localhost:3001/letscrum/api/project/workItem', {
        title: param.title
      })
      setSaveLoading(false)
      console.log('response: ', response)
    } catch (e: any) {
      setSaveError(e.message)
      setSaveLoading(false)
    }
  }
  const Editor = (params: { name: string, placeholder: string }): JSX.Element => {
    return <DetailItemContainer>
      <ItemTitleContainer>
        <ItemTitleOption direction='row'>
          <ItemTitleText>
            {params.name}
          </ItemTitleText>
          <FullScreenIcon />
          <CloseEditorIcon onClick={handleShowEditor} />
        </ItemTitleOption>
        <Divider sx={{ marginBottom: '.25rem' }} />
      </ItemTitleContainer>
      <Grid
        onClick={handleEditorFoucs}
        sx={{
          padding: '.25rem',
          height: '3rem',
          border: '1px solid white',
          color: grey[600],
          fontSize: '.75rem',
          fontStyle: 'italic',
          '&:hover': {
            border: `1px solid ${grey[200]}`,
            cursor: 'auto'
          }
        }}>
        {params.placeholder}
      </Grid>
    </DetailItemContainer>
  }
  // get item info
  useEffect(() => {
    void axios.get('http://localhost:3001/letscrum/api/project/workItem')
      .then((value) => {
        setCountComments(value.data.comments.length)
        setTitle(value.data.title)
        setOriginalTitle(value.data.title)
      })
  }, [])
  // editor auto focus
  useEffect(() => {
    reactQuill.current?.focus()
  }, [editorFocus])

  return <Grid>
    {/* item type */}
    <Grid
      container
      direction='row'
      sx={{
        borderLeftStyle: 'solid',
        borderLeftWidth: '10px',
        borderLeftColor: red[900],
        minHeight: '1.5rem',
        alignItems: 'center'
      }}>
      <Grid
        item
        xs={12}
        md='auto'
      >
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <PestControl sx={{ marginLeft: '.75rem', marginRight: '.5rem', color: red[900], fontSize: 'small' }} />
          <Typography variant='overline'>
            NEW BUG *
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md
      >
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <ErrorOutlined sx={{ marginLeft: '.75rem', color: red[900], fontSize: 'small' }} />
          <Typography variant='body2' sx={{ marginLeft: '.25rem', color: red[900] }}>
            {
              saveError !== null
                ? <span>{saveError}</span>
                : <span>Field &lsquo;Title&lsquo; cannot be empty.</span>
            }
          </Typography>
        </Stack>
      </Grid>
    </Grid>
    {/* item title */}
    <Grid
      sx={{
        // padding: '.25rem 0',
        borderLeftStyle: 'solid',
        borderLeftWidth: '10px',
        borderLeftColor: red[900],
        height: '3rem',
        justifyContent: 'center'
      }}
    >
      <TitleInput
        value={title}
        onChange={handleTitle}
        size='small'
        placeholder='Enter Title'
        sx={{ marginLeft: '.75rem', marginRight: '.75rem' }}
        hiddenLabel
      />
    </Grid>
    {/* item general options */}
    <Grid
      container
      sx={{
        borderLeftStyle: 'solid',
        borderLeftWidth: '10px',
        borderLeftColor: red[900],
        minHeight: '3rem',
        alignItems: 'center',
        justifyContent: 'between'
      }}
    >
      {/* assign to Selector */}
      <Grid item xs={12} md={4} paddingY='.25rem'>
        <Stack>
          <Autocomplete
            sx={{
              marginLeft: '.75rem',
              '& .MuiInputBase-root': {
                borderRadius: '0'
              },
              '& .MuiOutlinedInput-root': {
                padding: '0',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: blue[600]
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: blue[600]
                },
                '& .MuiAutocomplete-input': {
                  padding: '.125rem'
                }
              }
            }}
            options={members}
            getOptionLabel={(option: any) => option.userName}
            renderOption={(props, option) => (
              <Box component='li' {...props} key={option.userId}>
                <Avatar sx={{ width: '2rem', height: '2rem' }}>
                  {(option.userName != null) ? option.userName[0].toUpperCase() : ''}
                </Avatar>
                <Stack sx={{ marginLeft: '.25rem' }}>
                  <Typography sx={{ fontSize: '.75rem' }}>
                    {option.userName}
                  </Typography>
                  <Typography sx={{ fontSize: '.75rem' }}>
                    {option.userId}
                  </Typography>
                </Stack>
                <ClearOutlined sx={{ marginLeft: 'auto', marginRight: '.25rem', fontSize: '1rem', color: red[700] }} />
                <ContactMailOutlined sx={{ fontSize: '1rem', color: grey[700] }} />
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                sx={{
                  width: '18rem',
                  padding: '0',
                  '& .MuiInputBase-root': {
                    height: '1.5rem',
                    fontSize: '.75rem',
                    color: grey[600]
                  }
                }}
                placeholder='Unassigned'
                hiddenLabel
              />
            )}
          />
        </Stack>
      </Grid>
      {/* comments */}
      <Grid item xs={12} md={4} paddingY='.25rem'>
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`Go to discussion. There are ${countComments} comments available (Ctrl+Shift+D)`}>
            <CommentButton startIcon={<ForumOutlined sx={{ fontSize: '.75rem', color: blue[700] }} />}>
              <Typography sx={{ fontSize: '.75rem', letterSpace: '.125', color: grey[800] }}>
                {countComments} comments
              </Typography>
            </CommentButton>
          </Tooltip>
          {
            selectedTagsArray.map((tag, index) => (
              <Chip
                key={`${index}+${tag}`}
                label={tag}
                deleteIcon={<Clear sx={{ width: '.875rem', height: '.875rem' }} />}
                onDelete={() => setSelectedTagsArray(
                  selectedTagsArray.filter((t, i) => i !== index)
                )}
                sx={{
                  marginLeft: '.75rem',
                  height: '1.5rem',
                  backgroundColor: blue[50],
                  borderRadius: '0',
                  fontSize: '.75rem',
                  color: grey[800]
                }}
              />
            ))
          }
          {
            addFocus
              ? <AddTag
                freeSolo
                openOnFocus
                value={selectedTag}
                onChange={(e, newValue: any) => {
                  setSelectedTag(newValue)
                  setSelectedTagsArray([
                    ...selectedTagsArray,
                    newValue
                  ])
                  setAddFocus(false)
                  setSelectedTag('')
                }}
                options={tags}
                getOptionLabel={(option: any) => option}
                renderOption={(props, option: any) => (
                  <Box component='li' {...props}>
                    <Typography variant='body2'>
                      {option}
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => <AddTagInput
                  {...params}
                  onBlur={handleAddBlur}
                  autoFocus
                />}
              />
              : selectedTagsArray.length !== 0
                ? <Tooltip title='Add tag'>
                  <IconButton
                    onClick={() => {
                      setAddFocus(true)
                    }}
                    sx={{
                      marginLeft: '.75rem',
                      width: '1.5rem',
                      height: '1.5rem',
                      backgroundColor: blue[50],
                      borderRadius: '0',
                      '&:hover': {
                        backgroundColor: blue[100]
                      },
                      '&:active': {
                        backgroundColor: blue[800]
                      }
                    }}>
                    <Add sx={{ width: '.875rem', height: '.875rem' }} />
                  </IconButton>
                </Tooltip>
                : <AddTagButton onClick={() => {
                  setAddFocus(true)
                }}>
                  <Typography sx={{ fontSize: '.75rem', letterSpace: '.125', color: grey[600] }}>
                    Add tag
                  </Typography>
                </AddTagButton>
          }
        </Stack>
      </Grid>
      {/* edit options */}
      <Grid item xs={12} md={4} paddingY='.25rem'>
        <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'end' }}>
          {
            title === originalTitle
              ? <Button
                disabled
                variant='contained'
                sx={{
                  margin: '0 .5rem 0 0',
                  padding: '.125rem .425rem',
                  borderRadius: '0',
                  backgroundColor: grey[300],
                  fontSize: '.75rem',
                  color: grey[500]
                }}
                startIcon={<Save sx={{ color: grey[500] }} />}>
                Save
              </Button>
              : saveLoading
                ? <Button
                  variant='outlined'
                  onClick={() => { void handleSave({ title }) }}
                  sx={{
                    margin: '0 .5rem 0 0',
                    padding: '.125rem .425rem',
                    backgroundColor: blue[800],
                    borderRadius: '0',
                    fontSize: '.75rem',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: blue[900]
                    }
                  }}
                  startIcon={<HourglassBottom sx={{ color: 'white' }} />}>
                  Save
                </Button>
                : <Button
                  variant='outlined'
                  onClick={() => { void handleSave({ title }) }}
                  sx={{
                    margin: '0 .5rem 0 0',
                    padding: '.125rem .425rem',
                    backgroundColor: blue[800],
                    borderRadius: '0',
                    fontSize: '.75rem',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: blue[900]
                    }
                  }}
                  startIcon={<Save sx={{ color: 'white' }} />}>
                  Save
                </Button>
          }
          <GeneralDisableOptionButton disabled>
            <Refresh />
          </GeneralDisableOptionButton>
          {/* <GeneralOptionButton>
              <Refresh />
            </GeneralOptionButton> */}
          <GeneralDisableOptionButton disabled>
            <Undo />
          </GeneralDisableOptionButton>
          {/* <GeneralOptionButton>
              <Undo />
            </GeneralOptionButton> */}
          <IconButton sx={{
            margin: '0 .5rem 0 0',
            color: grey[900],
            borderRadius: '0',
            padding: '.125rem',
            '&:hover': {
              backgroundColor: blue[50]
            }
          }}>
            <MoreHoriz />
          </IconButton>
        </Stack>
      </Grid>
    </Grid >
    {/* item state and location */}
    <Grid container
      direction='row'
      sx={{
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: grey[300],
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: grey[300],
        backgroundColor: grey[100]
      }}>
      {/* first line */}
      <Grid item md={3}>
        <Stack direction='row' sx={{ padding: '1rem', alignItems: 'center' }}>
          <StateText>
            State
          </StateText>
          <Brightness1 sx={{ marginRight: '.315rem', fontSize: '.875rem', color: grey[500] }} />
          <Select value='new' input={<StateInput />}>
            <StateItem value='new'>New</StateItem>
          </Select>
        </Stack>
      </Grid>
      <Grid item md={6}>
        <Stack direction='row' sx={{ padding: '1rem', alignItems: 'center' }}>
          <StateText>
            Area
          </StateText>
          <Select value='imoogoo' input={<StateInput />}>
            <StateSuggestion component='li'>Suggestions</StateSuggestion>
            <StateItem value='imoogoo'>iMooGoo</StateItem>
          </Select>
        </Stack>
      </Grid>
      <Grid item md={3} />
      {/* second line */}
      <Grid item md={3}>
        <SecondRow direction='row' sx={{ padding: '0 1rem 1rem 1rem', alignItems: 'center' }}>
          <StateText>
            Reason
          </StateText>
          <Select value='defect' input={<StateInput />}>
            <StateItem value='failure'>Build Failure</StateItem>
            <StateItem value='defect'>New defect reported</StateItem>
          </Select>
        </SecondRow>
      </Grid>
      <Grid item md={6}>
        <SecondRow direction='row' sx={{ padding: '0 1rem 1rem 1rem', alignItems: 'center' }}>
          <StateText>
            Iteration
          </StateText>
          <Select value='imoogoo' input={<StateInput />}>
            <StateSuggestion component='li'>Suggestions</StateSuggestion>
            <StateItem value='imoogoo'>iMooGoo</StateItem>
          </Select>
        </SecondRow>
      </Grid>
      <Grid item md={3} />
    </Grid>
    {/* detail section */}
    <Grid container>
      {/* left column */}
      <Grid item md={6} xs={12}>
        {/* repro steps */}
        <DetailItemContainer>
          <ItemTitleContainer>
            <ItemTitleOption direction='row'>
              <ItemTitleText>
                Repro Steps
              </ItemTitleText>
              <FullScreenIcon />
              {
                showEditor
                  ? <ShowEditorIcon onClick={handleShowEditor} />
                  : <CloseEditorIcon onClick={handleShowEditor} />
              }
            </ItemTitleOption>
            <Divider sx={{ marginBottom: '.25rem' }} />
          </ItemTitleContainer>
          {/* editor container */}
          {
            showEditor &&
            <div>
              {
                editorFocus
                  ? <div>
                    <ReactQuill
                      theme='snow'
                      modules={modules}
                      formats={formats}
                      ref={reactQuill}
                      value={editorValue}
                      onChange={handleEditorValue}
                      onBlur={handleEditorBlur}
                    />
                    <QuillToolbar />
                  </div>
                  : <Grid
                    onClick={handleEditorFoucs}
                    sx={{
                      padding: '.25rem',
                      height: '3rem',
                      border: '1px solid white',
                      color: grey[600],
                      fontSize: '.75rem',
                      fontStyle: 'italic',
                      '&:hover': {
                        border: `1px solid ${grey[200]}`,
                        cursor: 'auto'
                      }
                    }}>
                    Click to add Repro Steps
                  </Grid>
              }
            </div>
          }
        </DetailItemContainer>
        {/* System Info */}
        <Editor name='System Info' placeholder='Click to add System Info' />
        {/* Acceptance Criteria */}
        <Editor name={'Acceptance Criteria'} placeholder={'Click to add Acceptance Criteria'} />
        {/* Discussion */}
        <DetailItemContainer>
          <ItemTitleContainer>
            <ItemTitleOption direction='row'>
              <ItemTitleText>
                Discussion
              </ItemTitleText>
              <FullScreenIcon />
              {
                showEditor
                  ? <ShowEditorIcon onClick={handleShowEditor} />
                  : <CloseEditorIcon onClick={handleShowEditor} />
              }
            </ItemTitleOption>
            <Divider sx={{ marginBottom: '.25rem' }} />
          </ItemTitleContainer>
          {
            showEditor &&
            <Stack direction='row'>
              <Avatar sx={{
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: blue[800],
                fontSize: '.875rem'
              }}>
                {name?.toLocaleUpperCase().charAt(0)}
              </Avatar>
              <Grid
                sx={{
                  marginLeft: '.5rem',
                  padding: '.25rem',
                  height: '6rem',
                  border: `1px solid ${grey[200]}`,
                  borderRadius: '.315rem',
                  color: grey[600],
                  fontSize: '.875rem',
                  fontStyle: 'italic',
                  '&:hover': {
                    border: `1px solid ${grey[200]}`,
                    cursor: 'auto'
                  }
                }}>
                Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person
              </Grid>
            </Stack>
          }
        </DetailItemContainer>
      </Grid>
      {/* middle column */}
      <Grid item md={3} xs={12}>
        {/* details */}
        <DetailItemContainer>
          <ItemTitleContainer>
            <ItemTitleOption direction='row'>
              <ItemTitleText>
                Details
              </ItemTitleText>
              {
                showDetails
                  ? <ShowEditorIcon onClick={handleShowDetails} />
                  : <CloseEditorIcon onClick={handleShowDetails} />
              }
            </ItemTitleOption>
            <Divider sx={{ marginBottom: '.25rem' }} />
          </ItemTitleContainer>
          {
            showDetails &&
            <Stack>
              <Stack>
                <DetailItemTitle>
                  Priority
                </DetailItemTitle>
                <Autocomplete
                  options={priority}
                  renderInput={
                    (params) =>
                      <DetailAutoCompleteInput
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                      />
                  }
                  renderOption={(props, option: any) => (
                    <Box component="li" {...props} >
                      <DetailAutocompleteItem>
                        {option}
                      </DetailAutocompleteItem>
                    </Box>
                  )}
                />
              </Stack>
              <DetailItemTitle>
                Severity
              </DetailItemTitle>
              <FormControl>
                <Select
                  value={severityValue}
                  onChange={handleSeverityValue}
                  input={<SelectSeverity />}
                >
                  {
                    severity.map((item, index) => (
                      <SeverityItem key={index} value={item}>
                        {item}
                      </SeverityItem>
                    )
                    )
                  }
                </Select>
              </FormControl>
              <Typography>
                Effort
              </Typography>
              <Typography>
                Remaining Work
              </Typography>
              <Typography>
                Activity
              </Typography>
            </Stack>
          }
        </DetailItemContainer>
        <Stack>
          <Typography>
            Build
          </Typography>
          <Typography>
            Found in Build
          </Typography>
          <Typography>
            Integrated in Build
          </Typography>
        </Stack>
      </Grid>
      {/* right column */}
      <Grid item md={3} xs={12}>
        <Stack>
          <Typography>
            Deployment
          </Typography>
        </Stack>
        <Stack>
          <Typography>
            Development
          </Typography>
        </Stack>
        <Stack>
          <Typography>
            Related Work
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  </Grid >
}
