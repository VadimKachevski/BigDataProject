import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { SocketContext, socket } from 'src/context/socket';
import { SocketContextTable, socketTable } from 'src/context/socket';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <SocketContextTable.Provider value={socketTable}>
          <GlobalStyles />
          {routing}
        </SocketContextTable.Provider>
      </SocketContext.Provider>
    </ThemeProvider>

  );
};

export default App;
