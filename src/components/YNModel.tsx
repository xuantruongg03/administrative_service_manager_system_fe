function YNModel(props: { isOpen: boolean; onClose: () => void; onConfirm: () => void, label: string, description: string, yesLabel: string, noLabel: string }) {
    const { isOpen, onClose, onConfirm, label, description, yesLabel, noLabel } = props;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10001">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto relative z-10 animate-zoom-in">
                <h2 className="text-xl font-bold mb-4">{label}</h2>
                <p className="mb-6">{description}</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" onClick={onClose}>
                        {noLabel}
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onConfirm}>
                        {yesLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default YNModel;