import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import data from './Table/Datasource.json';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

//Random Row Details Generator
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

//Roles Array from which Randomly Generate Roles
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};


//Initialize Arrays ?? We can introduces JSON object -> Rows
//From The JSON Object We can get initial Rows

/*const[userData,setUserState] = React.useState(users);
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((data) => data.json())
    .then((data) => setTableData(data))

}, [])*/

/*const initialRows = [
  {
    id: "65698b05eeedd468bfe5ea74",
    name: "SupplierThree",
    companyName: "SupplierThreeCompany",
    type:1,
    email:"apoorv.info@gmail.com",
    city:3,
    state:2,
    contactNumber:1334567890,
    gstNumber:123452,
    productType:3,
    
  },
  {
    id: "656b404d98a25df6f82039c9",
    name: "SupplierTwo",
    companyName: "SupplierTwoCompany",
    type:2,
    email:"apoorv.trickster@gmail.com",
    city:3,
    state:2,
    contactNumber:12254869,
    gstNumber:65466,
    productType:1,
    
  },
  {
    id: "656c86143bab9e005c8b19f9",
    name: "SupplierOne",
    companyName: "SupplierTwoCompany",
    type:1,
    email:"apoorv.incognito@gmail.com",
    city:1,
    state:2,
    contactNumber:9412557856,
    gstNumber:124567,
    productType:1,
    
  },
 
 
 
 
];*/


//Add The required Information
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;



  //Function Not Working ((Later Add API to add new Record))
  //Function to add new Record
  const handleClick = () => {
    const id = randomId(); // ID to be introduced here for New Record
    setRows((oldRows) => [...oldRows, { id, name: 'Name?',companyName:'Company Name?',type:'Select',email:'Your Email',city:'Select',state:'Select',contactNumber:'Your Phone',gstNumber:'GST No',productType:'Select', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };


    //AddRecord Button
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
 
  const [rows, setRows] = React.useState(data); //Process data without $oid
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row._id.$oid !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id.$oid === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id.$oid !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id.$oid === newRow._id.$oid ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  //Defining The columns from the JSON Object and include the Last two Buttons in that.
  const columns = [
    { field: 'name', headerName: 'Name', width: 150,align: 'left',
    headerAlign: 'left', editable: true },
    {
      field: 'companyName',
      headerName: 'Company Name',
     
      width: 200,
      
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
    
      width: 250,
      editable: true,
    },
    
    {
      field: 'type',
      headerName: 'Supplier Type',
      width: 150,
      editable: true,
     
    },
    {
      field: 'city',
      headerName: 'City',
      width: 100,
      editable: true,
    
    },
    {
      field: 'state',
      headerName: 'State',
      width: 100,
      editable: true,
      
    },
    {
      field: 'contactNumber',
      headerName: 'Contact',
      width: 150,
      editable: true,
      
      
    },
    {
      field: 'gstNumber',
      headerName: 'GST No',
      width: 100,
      editable: true,
     
      
    },
    {
      field: 'productType',
      headerName: 'Product Type',
      width: 200,
      editable: true,
     
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row: any) =>  row._id.$oid}
        editMode="row"
        
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}