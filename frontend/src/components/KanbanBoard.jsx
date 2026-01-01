import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';

const KanbanBoard = ({ tasks, onEdit, onStatusChange }) => {
    const columns = {
        Todo: {
            title: 'To Do',
            items: tasks.filter((t) => t.status === 'Todo'),
            color: 'bg-gray-100 border-gray-200',
            headerColor: 'text-gray-700',
        },
        'In Progress': {
            title: 'In Progress',
            items: tasks.filter((t) => t.status === 'In Progress'),
            color: 'bg-blue-50 border-blue-100',
            headerColor: 'text-blue-700',
        },
        Completed: {
            title: 'Completed',
            items: tasks.filter((t) => t.status === 'Completed'),
            color: 'bg-green-50 border-green-100',
            headerColor: 'text-green-700',
        },
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            // Status changed
            onStatusChange(draggableId, destination.droppableId);
        }
    };

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(columns).map(([id, column]) => (
                    <div key={id} className={`rounded-xl p-4 ${column.color} border min-h-[500px]`}>
                        <h3 className={`font-bold mb-4 flex items-center justify-between ${column.headerColor}`}>
                            {column.title}
                            <span className="bg-white/50 px-2 py-1 rounded text-sm">
                                {column.items.length}
                            </span>
                        </h3>
                        <Droppable droppableId={id}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`space-y-3 min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-black/5 rounded-lg' : ''
                                        }`}
                                >
                                    {column.items.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={provided.draggableProps.style}
                                                >
                                                    <TaskItem task={task} onEdit={onEdit} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
