
export function formatTime(time) {
    if(time == null){
        return null
    }else if(isNaN(time)){
        return null        
    } else if(time < 0){
        return null
    } else {
        let seconds = Math.floor(time % 60).toString()
        let minutes = Math.floor((time / 60) % 60).toString()
        let hours = Math.floor(time / 3600).toString()

        return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }
}   