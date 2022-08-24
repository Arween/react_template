import {
  ReactNode,
  ChangeEvent,
  useState,
  useEffect,
  useContext,
  useRef,
  RefObject,
  Ref,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import styled from 'styled-components';
import {
  showPosts,
  getPostsAsync,
  setSearchValue,
  setOrderingValue,
} from '../../../core/slices/postsSlice';
import { IPost, IPostsInfo } from '../../../types/posts';
import { VirtuosoGrid } from 'react-virtuoso';
import { Card } from './Card';

export interface IItem {
  id: number;
  text: string;
}

export const FinancePage = () => {
  const { finance, searchValue, orderingValue } = useSelector(showPosts);

  const dispatch = useDispatch();
  const virtuoso = useRef<any>(null);
  const [align, setAlign] = useState('start');
  const [behavior, setBehavior] = useState('auto');

  const [cards, setCards] = useState(finance?.settings || []);
  const [isEditSetting, setIsEditSetting] = useState(true);

  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(15);

  const [isScrolling, setIsScrolling] = useState(false);

  const [fields, setFields] = useState(['id', 'author', 'title']);

  console.log({ finance });

  useEffect(() => {
    if (finance && isEditSetting) {
      setCards(finance?.settings);
      setIsEditSetting(false);
    }
  }, [finance, isEditSetting]);

  useEffect(() => {
    dispatch(getPostsAsync({ searchValue, orderingValue, limit: limit + 1, offset }) as any);
  }, [searchValue, orderingValue, dispatch, limit, offset]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    dispatch(setSearchValue(event.target.value));
  };

  const changeIsScrolling = (isScrolling2: boolean) => {
    console.log({ isScrolling2 });
    if (!isScrolling2 || endIndex === finance?.count) {
      setOffset(startIndex);
      setLimit(endIndex - startIndex);
    }
    setIsScrolling(isScrolling2);
    return isScrolling2;
  };

  // const [boxHeight, setBoxHeight] = useState(window.innerHeight - 300);

  // useEffect(() => {
  //   window.addEventListener('resize', function (event) {
  //     setBoxHeight(window.innerHeight - 300);
  //   });
  // }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: IItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as IItem],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
    },
    [moveCard],
  );

  return (
    <div>
      {virtuoso && (
        <>
          <button
            onClick={() => {
              const myRef = virtuoso as any;
              myRef?.current.scrollToIndex({
                index: 60,
                align,
                behavior,
              });
              return false;
            }}>
            Scroll To 60
          </button>
          <button
            onClick={() => {
              const myRef = virtuoso as any;
              myRef?.current.scrollToIndex({
                index: 120,
                align,
                behavior,
              });
              return false;
            }}>
            Scroll To 120
          </button>
        </>
      )}
      {finance && (
        <>
          <Header>
            <DndProvider backend={HTML5Backend}>
              <Row>{cards.map((card, i) => renderCard(card, i))}</Row>
            </DndProvider>
          </Header>
          <VirtuosoGrid
            ref={virtuoso}
            style={{ height: '75vh' }}
            totalCount={finance?.count}
            overscan={1000}
            components={{
              Item: ItemContainer,
              List: ListContainer,
              ScrollSeekPlaceholder: ({ height, width, index }) => (
                <ItemWrapper>
                  <Cell> ------- </Cell>
                </ItemWrapper>
              ),
            }}
            isScrolling={changeIsScrolling}
            itemContent={(index) => (
              <ItemWrapper>
                <Cell>Index: {index}</Cell>
                {/* <div>{index - startIndex}</div> */}
                <textarea readOnly>At w3schools.com you will</textarea>
                <Row>
                  {cards.map(({ text, id }) => (
                    <Cell key={id}>
                      {text}: {finance.results[index - startIndex]?.[text]}{' '}
                    </Cell>
                  ))}
                </Row>
                {/* // {finance.results[index - startIndex] && (
                  //   <div>ID: {finance.results[index - startIndex].id}</div>
                  // )} */}
              </ItemWrapper>
            )}
            rangeChanged={(range) => {
              console.log('!!!!!', { range });
              setStartIndex(range.startIndex);
              setEndIndex(range.endIndex);
            }}
            // scrollSeekConfiguration={{
            //   enter: (velocity) => Math.abs(velocity) > 200,
            //   exit: (velocity) => Math.abs(velocity) < 30,
            //   change: (_, range) => {
            //     // console.log({ range });
            //     // setStartIndex(range.startIndex < 20 ? range.startIndex : range.startIndex - 20);
            //     // setStartIndex(range.startIndex);
            //     // setEndIndex(range.endIndex);
            //   },
            // }}
          />
        </>
      )}
    </div>
  );
};

const Header = styled.div``;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex: none;
  align-content: stretch;
  box-sizing: border-box;
  /* background: red; */
`;

const ItemWrapper = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  font-size: 80%;
  /* padding: 1rem 1rem; */
  border: 1px solid var(gray);
  white-space: nowrap;
  flex-direction: row;
`;

const Cell = styled.div`
  width: 160px;
  border: 1px solid grey;
  /* padding: 10px; */
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background: blue; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
