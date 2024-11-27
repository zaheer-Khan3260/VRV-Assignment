import React from 'react'

function RecentLogContainer() {
  const [recentLogs, setRecentLogs] = React.useState([]);

  React.useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('recentLogs')) || [];
    setRecentLogs(logs);
  }, []);
  return (
    <div className="w-full h-[31.5rem] border rounded-xl md:ml-3">
    
            <div className='w-full border-b h-10 flex text-white font-semibold bg-secondry-background rounded-t-xl '>
                <div className='w-4/12 p-2 ml-5'>Time</div>
                <div className='p-2'>Recent Logs</div>
            </div>
            <div className='h-[28.9rem] overflow-y-auto scrollbar-hidden bg-black rounded-b-xl'>
            {
                recentLogs.length > 0 ? (
                    recentLogs.map((log, index) => (
                        <div key={index} className='space-x-3 md:space-x-40 px-1 md:px-4 py-2 animate__animated animate__fadeIn flex'>
                        <div className='text-red-500'>{log[0]}</div>
                        <div className='text-green-300'>{log[1]}</div>
                        </div>
                    ))
                ) : (
                    <div className='px-4 py-2 flex justify-center w-full h-[16rem] items-center text-xl'>
                        <span className='text-slate-300'>There are no recent logs</span>
                    </div>
                )
            }
            </div>
      
    </div>
  )
}

export default RecentLogContainer
