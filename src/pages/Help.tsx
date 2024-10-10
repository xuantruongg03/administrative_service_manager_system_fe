import React, { useState } from 'react';

interface Issue {
  id: number;
  problem: string;
  solution: string;
}

function Help() {
  const [issues] = useState<Issue[]>([
    {
      id: 1,
      problem: "Không thể đăng nhập",
      solution: "Kiểm tra lại tên đăng nhập và mật khẩu. Nếu vẫn không được, hãy liên hệ với quản trị viên để đặt lại mật khẩu."
    },
    {
      id: 2,
      problem: "Không thể xem bản đồ",
      solution: "Đảm bảo rằng bạn đã cho phép trình duyệt truy cập vị trí của bạn. Nếu vẫn gặp vấn đề, hãy thử làm mới trang hoặc xóa bộ nhớ cache."
    },
    {
      id: 3,
      problem: "Không thể tải lên tài liệu",
      solution: "Kiểm tra kết nối internet của bạn và đảm bảo rằng tệp không vượt quá kích thước tối đa cho phép. Nếu vấn đề vẫn tiếp diễn, hãy thử chuyển đổi tệp sang định dạng khác."
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trợ giúp</h1>
      <div className="space-y-6">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{issue.problem}</h2>
            <p className="text-gray-600">{issue.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;