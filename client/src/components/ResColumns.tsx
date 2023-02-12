import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
interface Column {
  id: "name" | "responsibele_name" | "donation_val" | 'phone' | 'register_date' | 'register_time'| 'delivery_date' | 'edit';
  label: string | any;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
    {
    id: 'register_date',
    label: 'تسجيل',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
    {
    id: 'register_time',
    label: 'تسجيل',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
    {
    id: 'delivery_date',
    label: 'تسليم',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'phone',
    label: 'هاتف',
    minWidth: 20,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
    {
    id: 'donation_val',
    label: 'قيمة التبرع',
    minWidth: 30,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'name', label: ' المتبرع', minWidth: 40 },
{ id: 'responsibele_name', label: 'المسؤول', minWidth: 140 },

];
const columnsControls: readonly Column[] = [
    {
    id: 'edit',
    label: <SettingsIcon />,
    minWidth: 10,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
    {
    id: 'register_date',
    label: 'تسجيل',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
    {
    id: 'register_time',
    label: 'تسجيل',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
    {
    id: 'delivery_date',
    label: 'تسليم',
    minWidth: 23,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'phone',
    label: 'هاتف',
    minWidth: 20,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
    {
    id: 'donation_val',
    label: 'قيمة التبرع',
    minWidth: 30,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
{ id: 'name', label: ' المتبرع', minWidth: 40 },
{ id: 'responsibele_name', label: 'المسؤول', minWidth: 140 },

];

export  {columns, columnsControls}