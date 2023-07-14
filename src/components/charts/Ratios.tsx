// Next
import Image from 'next/image';

// React
import { SetStateAction, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js';

// Images
import DotsVertical from '../../assets/icons/dots-vertical.svg';

// Styles
import * as S from './Charts.styles';

// Models
import { LineChartProps } from './models';

// Moment
import moment from 'moment';

// Components
import { Broadcast } from 'components/broadcast';

import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { DataGraficos, TypeTabGrafico } from 'models';
import { getGraficoRatios } from 'services/api';
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

const RatiosChart = () => {
  const [dataInicio, setDataInicio] = useState(moment().subtract(7, 'days'));
  const [dataFinal, setDataFinal] = useState(moment());
  const [selectedPeriod, setSelectedPeriod] = useState('2');
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };
  const [array, setArray] = useState<any>([]);
  const handleDateChangeInicio = (e: { target: { value: moment.MomentInput } }) => {
    const date = moment(e.target.value);
    setDataInicio(date);
  };
  const handleDateChangeFinal = (e: { target: { value: moment.MomentInput } }) => {
    const date = moment(e.target.value);
    setDataFinal(date);
  };
  const [menu, setMenu] = useState([
    {
      name: 'Gest/Obst',
      selected: true,
      data: {},
      id: TypeTabGrafico.GESTOBST,
    },
    {
      name: 'Monit/Gest',
      selected: false,
      data: {},
      id: TypeTabGrafico.MONITGEST,
    },
    { name: 'Lemb/Gest', selected: false, data: {} as DataGraficos, id: TypeTabGrafico.LEMBGEST },
    {
      name: 'Alto risco/total',
      selected: false,
      data: {},
      id: TypeTabGrafico.ALTORISCOTOTAL,
    },
  ]);

  const updateSelectedMenu = (index: number) => {
    const updatedMenu = menu.map((item, i) => {
      if (i === index) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    return updatedMenu;
  };

  const handleMenuClick = (index: number) => {
    const updatedMenu = updateSelectedMenu(index);
    setMenu(updatedMenu);
  };

  const handlePeriodChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedPeriod(e.target.value);
  };

  const fetchDataGraficoRatio = async (tab: TypeTabGrafico) => {
    const inicio = dataInicio.toISOString();
    const final = dataFinal.toISOString();
    const type = parseInt(selectedPeriod);
    console.log(99999, inicio);
    const response = await getGraficoRatios(inicio, final, type, tab);
    console.log(99999, response.data);
    updateMenuWithData(response, tab);
  };

  const updateMenuWithData = (response: any, id: any) => {
    if (id === TypeTabGrafico.GESTOBST) {
      const newData = {
        labels: response.data.gestanteObstetra.map((item: { quantidade: number; date: string }) =>
          moment(item.date).format(selectedPeriod === '3' ? 'MM/YYYY' : 'DD/MM')
        ),
        values: response.data.gestanteObstetra.map((item: { quantidade: number; date: string }) => item.quantidade),
        id: TypeTabGrafico.GESTOBST,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
    if (id === TypeTabGrafico.MONITGEST) {
      const newData = {
        labels: response.data.monitoramentoObstetra.map((item: { quantidade: number; date: string }) =>
          moment(item.date).format(selectedPeriod === '3' ? 'MM/YYYY' : 'DD/MM')
        ),
        values: response.data.monitoramentoObstetra.map(
          (item: { quantidade: number; date: string }) => item.quantidade
        ),
        id: TypeTabGrafico.MONITGEST,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
    if (id === TypeTabGrafico.LEMBGEST) {
      const newData = {
        labels: response.data.lembreteGestante.map((item: { quantidade: number; date: string }) =>
          moment(item.date).format(selectedPeriod === '3' ? 'MM/YYYY' : 'DD/MM')
        ),
        values: response.data.lembreteGestante.map((item: { quantidade: number; date: string }) => item.quantidade),
        id: TypeTabGrafico.LEMBGEST,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
    if (id === TypeTabGrafico.ALTORISCOTOTAL) {
      const newData = {
        labels: response.data.altoriscoTotal.map((item: { quantidade: number; date: string }) =>
          moment(item.date).format(selectedPeriod === '3' ? 'MM/YYYY' : 'DD/MM')
        ),
        values: response.data.altoriscoTotal.map((item: { quantidade: number; date: string }) => item.quantidade),
        id: TypeTabGrafico.ALTORISCOTOTAL,
      };
      setArray((prevArray: any) => [...prevArray, newData]);
    }
  };
  useEffect(() => {
    setArray([]);
    fetchDataGraficoRatio(TypeTabGrafico.GESTOBST);
    fetchDataGraficoRatio(TypeTabGrafico.MONITGEST);
    fetchDataGraficoRatio(TypeTabGrafico.LEMBGEST);
    fetchDataGraficoRatio(TypeTabGrafico.ALTORISCOTOTAL);
  }, [dataInicio, dataFinal, selectedPeriod]);

  return (
    <S.Component>
      <div className="header_chart">
        <Broadcast name={'Ratios'} />
        <Image src={DotsVertical} alt="icon" />
      </div>

      <div className="filterDate">
        <input type="date" value={dataInicio.format('YYYY-MM-DD')} onChange={handleDateChangeInicio} />
        -
        <input type="date" value={dataFinal.format('YYYY-MM-DD')} onChange={handleDateChangeFinal} />
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="daily">Diário</option>
          <option value="monthly">Mensal</option>
          <option value="yearly">Anual</option>
        </select>
      </div>

      <S.ChartStyle>
        <ul>
          {menu.length > 0 &&
            menu.map((menuItem, index) => (
              <li
                key={index}
                onClick={() => handleMenuClick(index)}
                style={{
                  borderBottom: menuItem.selected ? '3px solid #2613f5 ' : ' 3px solid #e9e7fd',
                  cursor: 'pointer',
                }}
              >
                <p>{menuItem.name}</p>
              </li>
            ))}
        </ul>
        {menu.length > 0 &&
          menu.map((menuItem, index) => {
            return menuItem.selected ? (
              <Line
                key={index}
                data={{
                  labels: array?.filter((e: { id: TypeTabGrafico }) => e.id === menuItem.id)[0]?.labels,
                  datasets: [
                    {
                      label: 'Obstetras',
                      data: array?.filter((e: { id: TypeTabGrafico }) => e.id === menuItem.id)[0]?.values,
                      fill: false,
                      borderColor: '#0F60FF',
                      borderWidth: 4,
                    },
                  ],
                }}
                options={options}
              />
            ) : null;
          })}
      </S.ChartStyle>
    </S.Component>
  );
};

export default RatiosChart;
