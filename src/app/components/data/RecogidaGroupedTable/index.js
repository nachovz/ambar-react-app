import React from 'react';
import ExpansionPanel from 'app/components/ui/ExpansionPanel';
import Table from 'app/components/ui/Table';
import TextListElement from 'app/components/ui/ListElement/TextListElement';
import TableElement from 'app/components/ui/Table/TableElement';
import getColor from 'app/styles/palette';
import Icon from 'app/components/ui/Icon';
import { esIntlFormatter } from 'app/utils/esIntlFormatter';
import { TIPOS_RECOGIDAS } from 'app/constants/values';

const RecogidaGroupedTable = ({type, recogidas, onSelectedRecogida}) =>{
  const grouped = recogidas.filter( 
    reco => TIPOS_RECOGIDAS[reco.projcategoryid] === type 
  );
  if(grouped.length < 1) return null;
  let leyend = []; 
  switch(type){
    case 'recogida':
      leyend = ['Kgs./Lts.'];
      break;
    case 'entrega':
      leyend = ['Cantidad', 'Kgs./Lts.'];
      break;
    case 'servicio':
      leyend = ['Estado'];
      break;
    default:
      break;
  };
  if(onSelectedRecogida) leyend = [...leyend,<Icon icon="estado-aviso" color="primary" fontSize="small"/>]
  return(
    <React.Fragment key={type}>
      <ExpansionPanel
        noPadding 
        content={{
          title: type.toUpperCase(),
          background: getColor(type.toUpperCase()),
          content:(
            <React.Fragment>
              <Table
                noScrolling={!onSelectedRecogida}
                title={'Elemento/Código'}
                size="small"
                headers={leyend}
              >
                {grouped
                  .map( (reco,index) => {
                    const {
                      itemid,
                      itemname,
                      kgreal,
                      unidadesreal,
                      projcategoryid,
                      weight,
                      servicioRealizado,
                      done
                    } = reco;
                    const typeServicio = TIPOS_RECOGIDAS[projcategoryid] === "servicio";
                    let qts = ['-'];
                    if(done || typeServicio){
                      switch(TIPOS_RECOGIDAS[projcategoryid]){
                        case 'recogida':
                          qts = [
                            (
                              esIntlFormatter.format(
                                parseFloat((weight || "1").replace(',', '.')) 
                                * 
                                parseInt( unidadesreal ) * (kgreal/100)
                              )
                            )
                          ];
                          break;
                        case 'entrega':
                          qts = [
                            unidadesreal || "",
                            (
                              esIntlFormatter.format(
                                parseFloat((weight || "0").replace(',', '.')) 
                                * 
                                parseInt( unidadesreal ) * (kgreal/100)
                              )
                            )
                          ];
                          break;
                        case 'servicio':
                          qts = [servicioRealizado ? 'REALIZADO' : 'NO REALIZADO'];
                          break;
                        default:
                          qts = 'N/A';
                          break;
                      };
                    }
                    return(
                      <TableElement
                        key={index}
                        title={itemname}
                        subtitle={itemid}
                        cells={qts}
                        actionIcon={onSelectedRecogida && "editar"}
                        action={onSelectedRecogida && onSelectedRecogida(reco)}
                      />
                    )
                  }
                )
              }
              </Table>
              {type === 'recogida' &&
                <TextListElement
                  noDivider
                  informative
                  noIcon
                  subtitle="*La medida Kgs (kilogramos) es aplicada a los residuos sólidos, la medida Lts (litros) es aplicada a los residuos líquidos)"
                />
              }
            </React.Fragment>
          )
        }}
      />
    </React.Fragment>
  )
};

export default RecogidaGroupedTable;