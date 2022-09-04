//宣告 使用 state
const { useState } = React;

const TodoListItem = ({ item: { name, done, id }, changeState, deleteEvent }) => {

  return (
    <li>
      <label className="todoList_label">
        <input className="todoList_input" type="checkbox" checked={done} onChange={() => changeState(id)} />
        <span>{name}</span>
      </label>
      <a href="#" onClick={() => deleteEvent(id)}>
        <i className="fa fa-times"></i>
      </a>
    </li>
  )
}

const App = () => {
  const [event, setEvent] = useState('');
  const [currentTab, setCurrentTab] = useState('全部');

  const [list, setList] = useState(
    [
      { id: 1, done: true, name: '把冰箱發霉的檸檬拿去丟' },
      { id: 2, done: false, name: '打電話叫媽媽匯款給我' },
      { id: 3, done: false, name: '整理電腦資料夾' },
      { id: 4, done: false, name: '繳電費水費瓦斯費' },
      { id: 5, done: false, name: '約vicky禮拜三泡溫泉' },
      { id: 6, done: false, name: '約ada禮拜四吃晚餐' },
    ]
  );

  const onSubmit = () => {
    setList(prev => ([...prev, {
         id: Date.now(), done: false, name: event }]));
    setEvent('');
  }

  const onClickTab = (e) => {
    setCurrentTab(e.target.name);
  }

  const changeState = (id) => {
    setList(prevList => (
      prevList?.map(item => {
        if (item.id !== id) return item;
        return { ...item, done: !item.done }
      })
    ));
  }

  const deleteEvent = (id) => {
    setList(prevList => (prevList?.filter(event => event.id !== id)));
  }

  const clearDone = () => {
    setList(prevList => (prevList?.filter(item => item.done === false)));
  }
  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" 
            //表格框框內預設值
            placeholder="請輸入待辦事項" 
            //輸入內容的值 傳送到
            value={event} 
            //onChange 內容發生改變事件
            onChange={e => setEvent(e.target.value)} />
            <a href="#" onClick={onSubmit}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          {list?.length === 0 ? <p>目前尚無代辦事項</p> :
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a href="#" className={currentTab === '全部' ? "active" : ''} name="全部" onClick={onClickTab}>全部</a></li>
                <li><a href="#" className={currentTab === '待完成' ? "active" : ''} name="待完成" onClick={onClickTab}>待完成</a></li>
                <li><a href="#" className={currentTab === '已完成' ? "active" : ''} name="已完成" onClick={onClickTab}>已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  {list?.filter(event => {
                    if (currentTab === '全部') return true;
                    else if (currentTab === '待完成') return event.done === false;
                    else if (currentTab === '已完成') return event.done === true;
                  }).map((item, index) => {
                    return (
                      <TodoListItem item={item} key={item.id} changeState={changeState} deleteEvent={deleteEvent} />
                    )
                  })}
                </ul>
                <div className="todoList_statistics">
                  <p> {list?.filter(item => item.done === false)?.length} 個待完成項目</p>
                  <a href="#" onClick={clearDone}>清除已完成項目</a>
                </div>
              </div>
            </div>
          }
          
        </div>
      </div>
    </div>
  );
}

//宣告並建立一個 綁定html的id
const root = ReactDOM.createRoot(document.getElementById("root"));
//渲染
root.render(<App />);