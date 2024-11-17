import { useState } from 'react';

interface Issue {
  id: number;
  problem: string;
  solution: string;
}

function Help() {
  const [issues] = useState<Issue[]>([
    {
      id: 1,
      problem: "Không thể xem bản đồ", 
      solution: "Đảm bảo rằng bạn đã cho phép trình duyệt truy cập vị trí của bạn. Nếu vẫn gặp vấn đề, hãy thử làm mới trang hoặc xóa bộ nhớ cache."
    },
    {
      id: 2,
      problem: "Không thể tải lên tài liệu",
      solution: "Kiểm tra kết nối internet của bạn và đảm bảo rằng tệp không vượt quá kích thước tối đa cho phép. Nếu vấn đề vẫn tiếp diễn, hãy thử chuyển đổi tệp sang định dạng khác."
    },
    {
      id: 3,
      problem: "Không thể xem trước tài liệu",
      solution: "Hãy thử tải lại trang hoặc kiểm tra kết nối internet của bạn. Lưu ý một số loại tài liệu không hỗ trợ xem trước."
    }
  ]);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Trợ giúp</h1>
      <div className="grid gap-4">
        {issues.map((issue) => (
          <div 
            key={issue.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{issue.problem}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{issue.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;