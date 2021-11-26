import React from 'react';
import styles from './DaysToSummer.module.scss';

class DaysToSummer extends React.Component {
    DaysBetween(StartDate, EndDate){
        const oneDay = 1000 * 60 * 60 * 24;
        console.log(StartDate, EndDate, 'lolololool')
        const start = Date.UTC(EndDate.getUTCFullYear(), EndDate.getUTCMonth(), EndDate.getUTCDate());
        const end = Date.UTC(StartDate.getUTCFullYear(), StartDate.getUTCMonth(), StartDate.getUTCDate());

        return (start - end) / oneDay;
    }
    render(){
        const today = new Date()
        const countdownDays = this.DaysBetween(

            today,
            new Date(today.getUTCFullYear()  + ((today.getUTCMonth() >= 8 && today.getUTCDate() > 24 || today.getUTCMonth() >= 9 ) ? 1 : 0) , 5 , 22)
        );

        const isVacation = 
            (
                // today.getUTCMonth()<=7 || 
                (today.getUTCMonth() <= 8 && today.getUTCDate() <= 24 )
            ) 
              && 
            (
                // today.getUTCMonth() >=6 || 
                (today.getUTCMonth() >= 5 && today.getUTCDate() >= 22)
            )

        let day = countdownDays > 1? 'days': 'day'

        return(
            <div className={styles.component}>
                <div className={'CountDays'}>{
                isVacation 
                //|| countdownDays <=0
                ? '': <span>{countdownDays +' ' +  day + ' to summer!'}</span>}
                </div>
            </div>
        )
    }
}


export default DaysToSummer;