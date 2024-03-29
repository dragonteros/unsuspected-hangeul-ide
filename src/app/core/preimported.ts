import { IFolderTreeNodeProps } from "@dtinsight/molecule/esm/model";

const preimported: IFolderTreeNodeProps = {
  id: Number.MAX_SAFE_INTEGER,
  name: "작업공간",
  location: ".",
  fileType: "RootFolder",
  isLeaf: false,
  data: "",

  children: [
    {
      id: "1",
      name: "조각글",
      location: "./조각글",
      fileType: "Folder",
      isLeaf: false,
      data: "",
      children: [
        {
          id: "2",
          name: "가나다라마바사즤츼킈틔픠.pbhhg",
          location: "./조각글/가나다라마바사즤츼킈틔픠.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: String.raw`"""Aheui interpreter in Unsuspected Hangeul

It passes all the standard aheui test set, although 'loop' takes very much time.

Note that this code is also an Aheui program, making it a polyglot of Aheui and
Unsuspected Hangeul.

Usage (Python backend):
    $ python -m pbhhg_py.cli <path to this file> <path to some aheui file>

Usage (Node.js backend)
    $ node pbhhg_js/cli <path to this file> <path to some aheui file>
"""

def aheui(filepath: str) -> IO[int]:
    ㄱㅇㄱ ㄹ(rb) 꺼내ㅎㄷ  # IO[File['rb']]

    def with_file(file: File) -> IO[bytes]:
        ㄴㄱ(all) ㄹ ㄱㅇㄱㅎㄷ
    하:기로 하다  # IO[bytes]

    def on_read(content: bytes) -> IO[list[str]]:
        ㄱㅇㄱ  # bytes
            ㅂㄴㄱㅂㄱ (ㄴ ㄷ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # b'\r\n'
            분리ㅎㄷ  # list[bytes]
            ㄷㄴㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # b'\n'
            꿰매ㅎㄷ  # bytes
            ㄷㄴㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # b'\n'
            분리ㅎㄷ  # list[bytes]
        (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ) # utf8 bytes -> str
        ㅁㄷㅎㄷ 감싸ㅎㄴ  # IO[list[str]]
    하:기로 하다

    def into_table(lines: list[str]) -> IO[list[list[tuple | None]]]:
        def convert(character: str) -> tuple[int, int, int] | None:
            def is_hangeul_syllable(code: int) -> bool:
                ㅈㅈㅈㅂㄷㄴㄱ ㄱㅇㄱ 작ㅎㄷ  # code >= 0xAC00
                ㄱㅇㄱ ㅁㅁㅅㄹㅂㄴㄱ 작ㅎㄷ  # code <= 0xDCA3
                곱ㅎㄷ
            ㅎ

            def split_hangeul_syllable(code: int) -> tuple[int, int, int]:
                ㄱㅇㄱ ㄱㄱㄳㄷㄴ 더ㅎㄷ  # index = code - 0xAC00
                def _(index: int) -> tuple[int, int, int]:
                    [
                        ㄱㅇㄱ ㅁㄴㄴㄴㄱ(588) 나누ㅎㄷ,
                        ㄱㅇㄱ ㅁㄴㄴㄴㄱ(588) 나머ㅎㄷ ㅁㄹㄱ(28) 나누ㅎㄷ,
                        ㄱㅇㄱ ㅁㄹㄱ(28) 나머ㅎㄷ
                    ]
                    목록ㅎㄹ
                ㅎㅎㄴ
            ㅎ

            def _(is_hangeul_syllable, split_hangeul_syllable):
                ㄱㅇㄴ
                    (ㄱ ㄷ 가짜ㅎㄱ <평 바꾸기 ㅂㅎㄷ>ㅎㄹ)ㅎㄴ  # utf-16
                    (ㄴ ㄷ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # uint 16
                def _(code: int) -> tuple[int, int, int] | None:
                    if is_hangeul_syllable(code):
                        # return split_hangeul_syllable(code)
                        ㄱㅇㄱ ㄴㅇㄴㅎㄴ
                    else:
                        빈값ㅎㄱ
                    ㄱㅇㄱ ㄱㅇㄴㅎㄴㅎㄷ
                ㅎㅎㄴ
            ㅎㅎㄷ
        ㅎ

        def _(convert: Callable[[str], tuple | None]) -> IO[list[list[tuple | None]]]:
            ㄱㅇㄴ
            def _(line: str) -> list[tuple | None]:
                ㄱㅇㄱ 분리ㅎㄴ ㄱㅇㄴ ㅁㄷㅎㄷ
            ㅎ:ㅁㄷㅎㄷ 감싸ㅎㄴ
        ㅎㅎㄴ
    하:기로 하다  # program <- IO[list[list[tuple[int, int, int] | None]]

    def on_program(
        program: list[list[tuple[int, int, int] | None]],
    ) -> IO[int]:
        # state = (program, x, y, x_speed, y_speed, stores, selected_fd, stdin_buffer)

        def execute(
            choseong: int,
            jongseong: int,
            x_speed: int,
            y_speed: int,
            stores: list[list[int]],
            selected_fd: int,
            stdin_buffer: bytes,
        ) -> IO[tuple[int, int, list[list[int]], int, bytes]]:

            def push(
                stores: list[list[int]],
                fd: int,
                values: list[int],  # first thing first
            ) -> list[list[int]]:
                ㄱㅇㄱ ㄱ(0) ㄴㅇㄱ 발췌ㅎㄹ  # stores[:fd]
                if fd == QUEUE:
                    # values + stores[fd]
                    ㄷㅇㄱ (ㄴㅇㄱ ㄱㅇㄱㅎㄴ) 더ㅎㄷ
                else:
                    # stores[fd] + values
                    (ㄴㅇㄱ ㄱㅇㄱㅎㄴ) ㄷㅇㄱ 더ㅎㄷ
                (ㄴㅇㄱ 븡등긍 ㄴㅎㄷ)ㅎㄷ 목록ㅎㄴ
                ㄱㅇㄱ (ㄴㅇㄱ ㄴ ㄷㅎㄷ) 발췌ㅎㄷ  # stores[fd + 1:]
                ㄷㅎㄹ
            ㅎ

            def pop(
                stores: list[list[int]],
                fd: int,
                count: int,
            ) -> tuple[list[list[int]], list[int]]:  # first thing first
                if len(stores[fd]) < count:
                    모자람 뜻밖ㅎㄴ 던지ㅎㄴ
                else:
                    [
                        ㄱㅇㄱ ㄱ ㄴㅇㄱ 발췌ㅎㄹ
                        # stores[fd][:-count]
                        (ㄴㅇㄱ ㄱㅇㄱㅎㄴ) ㄱ (ㄷㅇㄱ ㄴㄱ 곱ㅎㄷ) 발췌ㅎㄹ 목록ㅎㄴ
                        ㄱㅇㄱ (ㄴㅇㄱ ㄴ ㄷㅎㄷ) 발췌ㅎㄷ
                        ㄷㅎㄹ,

                        # stores[fd][-1:-1-count:-1]
                        (ㄴㅇㄱ ㄱㅇㄱㅎㄴ)
                            ㄴㄱ (ㄷㅇㄱ ㄴㄱ 곱ㅎㄷ ㄴㄱ 더ㅎㄷ) ㄴㄱ 발췌ㅎㅁ
                    ] 목록ㅎㄷ
                ㄴㅇㄱ ㄱㅇㄱㅎㄴ 재다ㅎㄴ ㄷㅇㄱ 작ㅎㄷㅎㄷ
            ㅎ

            def duplicate(
                stores: list[list[int]],
                fd: int,
            ) -> list[list[int]]:
                if not stores[fd]:
                    모자람 뜻밖ㅎㄴ 던지ㅎㄴ
                else:
                    ㄱㅇㄱ ㄱ ㄴㅇㄱ 발췌ㅎㄹ  # stores[:fd]
                    (ㄴㅇㄱ ㄱㅇㄱㅎㄴ)
                        [ㄴㄱ (ㄴㅇㄱ ㄱㅇㄱㅎㄴ)ㅎㄴ] 목록ㅎㄴ
                        더ㅎㄷ 목록ㅎㄴ
                    ㄱㅇㄱ (ㄴㅇㄱ ㄴ ㄷㅎㄷ) 발췌ㅎㄷ  # stores[fd + 1:]
                    ㄷㅎㄹ
                ㄴㅇㄱ ㄱㅇㄱㅎㄴ 재다ㅎㄴ ㄱ ㄴㅎㄷㅎㄷ
            ㅎ

            def swap(
                stores: list[list[int]],
                fd: int,
            ) -> list[list[int]]:
                if len(stores[fd]) < 2:
                    모자람 뜻밖ㅎㄴ 던지ㅎㄴ
                else:
                    ㄱㅇㄱ ㄱ ㄴㅇㄱ 발췌ㅎㄹ  # stores[:fd]
                    (ㄴㅇㄱ ㄱㅇㄱㅎㄴ) ㄱ ㄷㄱ 발췌ㅎㄹ  # stores[fd][:-2]
                        [
                            ㄴㄱ (ㄴㅇㄱ ㄱㅇㄱㅎㄴ)ㅎㄴ,  # stores[fd][-1]
                            ㄷㄱ (ㄴㅇㄱ ㄱㅇㄱㅎㄴ)ㅎㄴ,  # stores[fd][-2]
                        ] 목록ㅎㄷ 더ㅎㄷ
                    목록ㅎㄴ
                    ㄱㅇㄱ (ㄴㅇㄱ ㄴ ㄷㅎㄷ) 발췌ㅎㄷ  # stores[fd + 1:]
                    ㄷㅎㄹ
                ㄴㅇㄱ ㄱㅇㄱㅎㄴ 재다ㅎㄴ ㄷ 작ㅎㄷㅎㄷ
            ㅎ

            def input_char(stdin_buffer: bytes) -> IO[tuple[int, bytes]]:
                ㄱ(stdin) ㄹ('rb') 꺼내ㅎㄷ  # IO[File]
                def on_open(stdin: File) -> IO[bytes, bytes]:
                    if len(stdin_buffer) == 0:
                        ㄴ(1) ㄹ ㄱㅇㄱㅎㄷ  # IO[bytes]
                        def on_raw_read(character: bytes) -> IO[tuple]:
                            [ㄱㅇㄱ, ㄱㅇㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                        하:기로 하다
                    else:
                        [ㄱ ㄱㅇㄴㅎㄴ, ㄱㅇㄴ ㄴ 발췌ㅎㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                    ㄱㅇㄴ 재다ㅎㄴ ㄱ ㄴㅎㄷㅎㄷ
                    def on_read_first(
                        first_byte: bytes, stdin_buffer: bytes
                    ) -> IO[bytes]:  # need to change this func
                        ㄱㅇㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ
                        def count_remaining_bytes(first_code: int) -> int:
                            ㄱ(0) if first_code < 0x80 else
                                ㄴ(2) if first_code < 0xE0 else
                                    ㄷ(3) if first_code < 0xF0 else
                                        ㄹ(4)
                                    ㄱㅇㄱ ㄱㅅㄹ 작ㅎㄷㅎㄷ
                                ㄱㅇㄱ ㄱㅁㄹ 작ㅎㄷㅎㄷ
                            ㄱㅇㄱ ㄱㄱㄷ 작ㅎㄷㅎㄷ
                        ㅎㅎㄴ
                        def read_remaining_bytes(
                            num_remaining_bytes: int
                        ) -> IO[tuple[bytes, bytes]]:
                            ㄱㅇㄱ ㄴㄱ ㄴㅇㄴ 재다ㅎㄴ 곱ㅎㄷ 더ㅎㄷ
                            def fill_buffer(
                                deficit: int
                            ) -> IO[bytes]:
                                if deficit > 0:
                                    ㄱㅇㄱ ㄹ ㄱㅇㄹㅎㄷ
                                    def on_read_supplement(supplement: bytes):
                                        ㄴㅇㄹ ㄱㅇㄱ 더ㅎㄷ 감싸ㅎㄴ
                                    하:기로 하다
                                else:
                                    ㄴㅇㄷ 감싸ㅎㄴ
                                ㄱ ㄱㅇㄱ 작ㅎㄷㅎㄷ
                            ㅎㅎㄴ
                            def on_fill_buffer(
                                stdin_buffer: bytes
                            ) -> IO[tuple[bytes, bytes]]:
                                [
                                    ㄱㅇㄷ ㄱㅇㄱ ㄱ ㄱㅇㄴ 발췌ㅎㄹ 더ㅎㄷ,
                                    ㄱㅇㄱ ㄱㅇㄴ 발췌ㅎㄷ,
                                ] 목록ㅎㄷ 감싸ㅎㄴ
                            하:기로 하다
                        ㅎㅎㄴ
                    ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
                하:기로 하다
                def on_read_all(
                    character: bytes, stdin_buffer: bytes
                ) -> IO[tuple[int, bytes]]:
                    [
                        ㄱㅇㄱ
                            (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # utf8 to str
                            (ㄱ ㅁ 가짜ㅎㄱ <평 바꾸기 ㅂㅎㄷ>ㅎㄹ)ㅎㄴ  # str to utf32le
                            (ㄴ ㅁ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ,  # utf32le to uint32
                        ㄴㅇㄱ
                    ] 목록ㅎㄷ 감싸ㅎㄴ
                ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
            ㅎ

            def input_int(stdin_buffer: bytes) -> IO[tuple[int, bytes]]:
                ㄱ(stdin) ㄹ('rb') 꺼내ㅎㄷ  # IO[File]
                def on_open(file: File) -> IO[bytes]:
                    문자ㅎㄱ (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # b''
                    진짜ㅎㄱ
                    ㄱㅇㄴ
                    def read_digits(
                        digits: bytes, is_first: bool, stdin_buffer: bytes
                    ) -> IO[tuple[bytes, bytes]]:
                        if len(stdin_buffer) == 0:
                            ㄴ(1) ㄹ ㄱㅇㄴㅎㄷ  # IO[bytes]
                            def on_raw_read(character: bytes) -> IO[tuple]:
                                if character == b'\r':
                                    ㄴ(1) ㄹ ㄱㅇㄷㅎㄷ  # IO[bytes]
                                    def on_more_raw_read(character: bytes):
                                        if character == b'\n':
                                            [ㄱㅇㄱ, ㄷㅇㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                                        else:  # just keep it
                                            [ㄱㅇㄴ, ㄱㅇㄱ ㄷㅇㄷ 더ㅎㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                                        ㄱㅇㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ ㄷㄴㄱ ㄴㅎㄷㅎㄷ
                                    하:기로 하다
                                else:
                                    [ㄱㅇㄱ, ㄷㅇㄴ] 목록ㅎㄷ 감싸ㅎㄴ
                                ㄱㅇㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ ㅂㄴㄱ ㄴㅎㄷㅎㄷ
                            하:기로 하다
                        else:
                            [ㄱ ㄱㅇㄱㅎㄴ, ㄱㅇㄱ ㄴ 발췌ㅎㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                        ㄷㅇㄱ 재다ㅎㄴ ㄱ ㄴㅎㄷㅎㄷ
                        def on_read(
                            character: bytes, stdin_buffer: bytes
                        ) -> IO[tuple[bytes, bytes]]:
                            ㄱㅇㄱ (ㄴ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ
                            def _(code: int) -> IO[tuple[bytes, bytes]]:
                                if is_sign_or_digit(code):
                                    (ㄱㅇㄷ ㄱㅇㄴ 더ㅎㄷ) 가짜ㅎㄱ ㄷㅇㄷ ㄷㅇㅎㄹ
                                else:
                                    if character in b' \t\n':
                                        # discard \`character\` and return
                                        [ㄱㅇㄷ, ㄷㅇㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                                    else:
                                        [ㄱㅇㄷ, ㄱㅇㄴ ㄷㅇㄷ 더ㅎㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                                    (ㄱㅇㄱ ㄱㅁㄱ ㄴㅎㄷ)  # b' '
                                    || (ㄱㅇㄱ ㄴㄴㄱ ㄴㅎㄷ)  # b'\t'
                                    || (ㄱㅇㄱ ㄷㄴㄱ ㄴㅎㄷ)  # b'\n'
                                    더ㅎㄹㅎㄷ
                                ㄴㅇㄷ  # is_first
                                    (ㄱㅇㄱ ㅂㅂㄱ ㄴㅎㄷ)  # b'+'
                                    (ㄱㅇㄱ ㄹㅂㄱ ㄴㅎㄷ)  # b'-'
                                    더ㅎㄷ
                                곱ㅎㄷ
                                    (ㅈㅂㄱ ㄱㅇㄱ 작ㅎㄷ)  # code >= 0x30
                                    (ㄱㅇㄱ ㄷㅈㄱ 작ㅎㄷ)  # code <= 0x39
                                    곱ㅎㄷ
                                더ㅎㄷㅎㄷ
                            ㅎㅎㄴ
                        ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
                    ㅎㅎㄹ
                하:기로 하다
                def on_read_all(
                    digits: bytes, stdin_buffer: bytes
                ) -> IO[tuple[int, bytes]]
                    [
                        ㄱㅇㄱ (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ 정수ㅎㄴ,
                        ㄴㅇㄱ
                    ] 목록ㅎㄷ 감싸ㅎㄴ
                ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
            ㅎ

            def print(data: str) -> IO[None]:
                ㄴ(stdin) 출력('wb') 꺼내ㅎㄷ  # IO[File]
                def on_open(stdout: File) -> IO[int]:
                    ㄱㅇㄴ (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # utf-8 bytes
                    출력 ㄱㅇㄱㅎㄷ  # IO[int]
                하:기로 하다
                def on_print(_: int) -> IO[None]:
                    빈값ㅎㄱ 감싸ㅎㄴ
                하:기로 하다
            ㅎ

            def _(
                push, pop, duplicate, swap, input_char, input_int, print
            ) -> IO[tuple[int, int, list[list[int]], int, bytes]]:
                try:
                    ㄱㅇㄴ
                    switch (choseong) {
                    case 릉능긍(11):
                        [ㄷㅇㄴ, ㄹㅇㄴ, ㅁㅇㄴ, ㅂㅇㄴ, ㅅㅇㄴ] 목록ㅎㅂ 감싸ㅎㄴ

                    case 륻(3):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # push(new_stores, selected_fd, [sum(retrieved)])
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄴㅇㄱ (더 ㅁㅂㅎㄴ)ㅎㄴ,
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 므(4):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # push(new_stores, selected_fd, [prod(retrieved)])
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄴㅇㄱ (곱 ㅁㅂㅎㄴ)ㅎㄴ,
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 긑듵긑(16):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            first, second = retrieved
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # push(new_stores, selected_fd, [second - first])
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄴ ㄴㅇㄱㅎㄴ
                                        ㄱ ㄴㅇㄱㅎㄴ ㄴㄱ 곱ㅎㄷ
                                        더ㅎㄷ
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 든(2):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            first, second = retrieved
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # push(new_stores, selected_fd, [second // first])
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄴ ㄴㅇㄱㅎㄴ ㄱ ㄴㅇㄱㅎㄴ 나누ㅎㄷ
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 블(5):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            first, second = retrieved
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # push(new_stores, selected_fd, [second % first])
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄴ ㄴㅇㄱㅎㄴ ㄱ ㄴㅇㄱㅎㄴ 나머ㅎㄷ
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ

                    case 슴(6):
                        # pop(stores, selected_fd, 1)
                        ㅁㅇㄴ ㅂㅇㄴ ㄴ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            if jongseong == IEUNG:
                                ㄱ ㄴㅇㄱㅎㄴ 문자ㅎㄴ ㅅㅇㄴㅎㄴ
                            else:
                                if jongseong == HIEUH:
                                    ㄱ ㄴㅇㄱㅎㄴ
                                        (ㄴ ㅁ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # u32le
                                        (ㄱ ㅁ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ  # utf32le
                                    ㅅㅇㄴㅎㄴ
                                else:
                                    빈값ㅎㄱ 감싸ㅎㄴ
                                <ㄴㅇㄷ 릏릏긓 ㄴㅎㄷ>ㅎㄷ
                            <ㄴㅇㄷ 븡등긍 ㄴㅎㄷ>ㅎㄷ
                            def on_print(_: None):
                                [ㄷㅇㄹ, ㄹㅇㄹ, ㄱㅇㄴ, ㅂㅇㄹ, ㅅㅇㄹ] 목록ㅎㅂ 감싸ㅎㄴ
                            하:기로 하다
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 즙(7):
                        def wrap(value: int) -> IO[tuple[int, bytes]]:
                            [ㄱㅇㄱ, ㅅㅇㄷ] 목록ㅎㄷ 감싸ㅎㄴ
                        ㅎ
                        def _(wrap):
                            ㄴㅇㄷ
                            [
                                그 ㄱㅇㄱㅎㄴ, 득 ㄱㅇㄱㅎㄴ, 믂 ㄱㅇㄱㅎㄴ, 믃 ㄱㅇㄱㅎㄴ,
                                든 ㄱㅇㄱㅎㄴ, 븑 ㄱㅇㄱㅎㄴ, 븒 ㄱㅇㄱㅎㄴ, 륻 ㄱㅇㄱㅎㄴ,
                                블 ㄱㅇㄱㅎㄴ, 즑 ㄱㅇㄱㅎㄴ, 늚늚긂 ㄱㅇㄱㅎㄴ,
                                늛늛긃 ㄱㅇㄱㅎㄴ, 즔 ㄱㅇㄱㅎㄴ, 늝늝긅 ㄱㅇㄱㅎㄴ,
                                늞늞긆 ㄱㅇㄱㅎㄴ, 긇늟긇 ㄱㅇㄱㅎㄴ, 믐 ㄱㅇㄱㅎㄴ,
                                믑 ㄱㅇㄱㅎㄴ, 슶 ㄱㅇㄱㅎㄴ, 듯 ㄱㅇㄱㅎㄴ, 믔 ㄱㅇㄱㅎㄴ,
                                ㅅㅇㄷ 븡응능흥능, 릊 ㄱㅇㄱㅎㄴ, 믗 ㄱㅇㄱㅎㄴ, 릌 ㄱㅇㄱㅎㄴ,
                                믙 ㄱㅇㄱㅎㄴ, 믚 ㄱㅇㄱㅎㄴ, ㅅㅇㄷ 믛읗능흫늫,
                            ] 목록ㅎㅁㄹㄱㅎㄴ
                        ㅎㅎㄴ
                        def on_value(value: int, stdin_buffer: bytes):
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                ㅁㅇㄷ ㅂㅇㄷ [ㄱㅇㄱ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㄴㅇㄱ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
                    case 그느그(8):
                        [
                            ㄷㅇㄴ, ㄹㅇㄴ, ㅁㅇㄴ ㅂㅇㄴ ㄷㅇㄱㅎㄷ, ㅂㅇㄴ, ㅅㅇㄴ,
                        ] 목록ㅎㅂ 감싸ㅎㄴ
                    case 늪듶긒(17):
                        [
                            ㄷㅇㄴ, ㄹㅇㄴ, ㅁㅇㄴ ㅂㅇㄴ ㄹㅇㄱㅎㄷ, ㅂㅇㄴ, ㅅㅇㄴ,
                        ] 목록ㅎㅂ 감싸ㅎㄴ

                    case 늣늣긋(9):
                        [ㄷㅇㄴ, ㄹㅇㄴ, ㅁㅇㄴ, ㄴㅇㄴ, ㅅㅇㄴ] 목록ㅎㅂ 감싸ㅎㄴ
                    case 듰늤긌(10):
                        # pop(stores, selected_fd, 1)
                        ㅁㅇㄴ ㅂㅇㄴ ㄴ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                # new_stores = push(stores, jongseong, retrieved)
                                ㄱㅇㄱ ㄴㅇㄷ ㄴㅇㄱ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ

                    case 믖늦긎(12):
                        # pop(stores, selected_fd, 2)
                        ㅁㅇㄴ ㅂㅇㄴ ㄷ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            [
                                ㄷㅇㄷ,
                                ㄹㅇㄷ,
                                ㄱㅇㄱ ㅂㅇㄷ [
                                    ㄱ(0) if second < first else ㄴ(1)
                                    (ㄴ ㄴㅇㄱㅎㄴ)(ㄱ ㄴㅇㄱㅎㄴ)작ㅎㄷㅎㄷ
                                ] 목록ㅎㄴ ㄱㅇㄴㅎㄹ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    case 슻늧긏(14):
                        # pop(stores, selected_fd, 1)
                        ㅁㅇㄴ ㅂㅇㄴ ㄴ ㄴㅇㄱㅎㄹ
                        def _(new_stores: list[list[int]], retrieved: list[int]):
                            if retrieved[0] == 0:
                                [
                                    ㄷㅇㄷ ㄴㄱ ㄱㅎㄷ,
                                    ㄹㅇㄷ ㄴㄱ ㄱㅎㄷ,
                                    ㄱㅇㄱ,
                                    ㅂㅇㄷ,
                                    ㅅㅇㄷ,
                                ] 목록ㅎㅂ 감싸ㅎㄴ
                            else:
                                [ㄷㅇㄷ, ㄹㅇㄷ, ㄱㅇㄱ, ㅂㅇㄷ, ㅅㅇㄷ] 목록ㅎㅂ 감싸ㅎㄴ
                            ㄱ ㄴㅇㄱㅎㄴ ㄱ ㄴㅎㄷㅎㄷ
                        ㅎ:ㅁㅂㅎㄴㅎㄴ
                    } 사전ㅎㅁㄹㄱㅎㄴ
                except (err):
                    if KeyError:
                        [ㄷㅇㄷ, ㄹㅇㄷ, ㅁㅇㄷ, ㅂㅇㄷ, ㅅㅇㄷ] 목록ㅎㅂ 감싸ㅎㄴ
                    else:
                        if Empty:
                            [
                                ㄷㅇㄷ ㄴㄱ ㄱㅎㄷ,
                                ㄹㅇㄷ ㄴㄱ ㄱㅎㄷ,
                                ㅁㅇㄷ,
                                ㅂㅇㄷ,
                                ㅅㅇㄷ,
                            ] 목록ㅎㅂ 감싸ㅎㄴ
                        else:
                            ㄱㅇㄱ 던지ㅎㄴ
                        (ㄱㅇㄱ 재다ㅎㄴ ㄴ ㄴㅎㄷ)(ㄱ ㄱㅇㄱㅎㄴ 모자람 ㄴㅎㄷ)곱ㅎㄷㅎㄷ
                    (ㄱㅇㄱ 재다ㅎㄴ ㄷ ㄴㅎㄷ)(ㄱ ㄱㅇㄱㅎㄴ 평 ㄴㅎㄷ)(ㄴ ㄱㅇㄱㅎㄴ 못찾 ㄴㅎㄷ)곱ㅎㄹㅎㄷ
                ㅎ:시도ㅎㄷ
            ㅎㅎㅈ
        ㅎ

        def get_velocity(
            jungseong: int, prev_x_speed: int, prev_y_speed: int
        ) -> tuple[int, int]:
            try:
                ㄱㅇㄱ {
                    가: [ㄴ(1), ㄱ(0)] 목록ㅎㄷ,
                    댜: [ㄷ(2), ㄱ(0)] 목록ㅎㄷ,
                    머: [ㄴㄱ(-1), ㄱ(0)] 목록ㅎㄷ,
                    셔: [ㄷㄱ(-2), ㄱ(0)] 목록ㅎㄷ,
                    고노고: [ㄱ(0), ㄴㄱ(-1)] 목록ㅎㄷ,
                    묘뇨교: [ㄱ(0), ㄷㄱ(-2)] 목록ㅎㄷ,
                    부누구: [ㄱ(0), ㄴ(1)] 목록ㅎㄷ,
                    뉴듀규: [ㄱ(0), ㄷ(2)] 목록ㅎㄷ,
                    드드그: [
                        ㄴㅇㄱ  # prev_x_speed,
                        ㄷㅇㄱ ㄴㄱ 곱ㅎㄷ  # -prev_y_speed
                    ] 목록ㅎㄷ,
                    릐듸긔: [
                        ㄴㅇㄱ ㄴㄱ 곱ㅎㄷ  # -prev_x_speed,
                        ㄷㅇㄱ ㄴㄱ 곱ㅎㄷ  # -prev_y_speed,
                    ] 목록ㅎㄷ,
                    미디기: [
                        ㄴㅇㄱ ㄴㄱ 곱ㅎㄷ  # -prev_x_speed,
                        ㄷㅇㄱ  # prev_y_speed,
                    ] 목록ㅎㄷ,
                } 사전ㅎㅅㄷㄱㅎㄴ[jungseong]
            except (err):
                # [prev_x_speed, prev_y_speed]
                [ㄴㅇㄴ, ㄷㅇㄴ] 목록ㅎㄷ
            ㅎ:시도ㅎㄷ
        ㅎ

        def read_table(x: int, y: int) -> tuple[int, int, int] | None:
            if x < len(table[y]):
                ㄱㅇㄱ(x) ㄴㅇㄱ(y) ㄱㅇㄴㅎㄴㅎㄴ
            else:
                빈값ㅎㄱ
            ㄱㅇㄱ(x) (ㄴㅇㄱ(y) ㄱㅇㄴㅎㄴ 재다ㅎㄴ) 작ㅎㄷㅎㄷ
        ㅎ

        def move(x: int, y: int, x_speed: int, y_speed: int) -> tuple[int, int]:
            def wrap(pos: int, length: int) -> int:
                if length == 0:
                    ㄱㅇㄱ
                else:
                    ㄱㅇㄱ ㄴㅇㄱ ㄷㅎㄷ ㄴㅇㄱ 나머ㅎㄷ
                ㄴㅇㄱ ㄱ ㄴㅎㄷㅎㄷ
            ㅎ
            def _(wrap) -> tuple[int, int]:
                if x_speed == 0:  # don't wrap both at the same time
                    # [x, wrap(y + y_speed, len(table))]
                    [ㄱㅇㄴ, ㄴㅇㄴ ㄹㅇㄴ 더ㅎㄷ ㄱㅇㄷ 재다ㅎㄴ ㄱㅇㄱㅎㄷ] 목록ㅎㄷ
                else:
                    # [wrap(x + x_speed, len(table[y])), y]
                    [ㄱㅇㄴ ㄷㅇㄴ 더ㅎㄷ ㄴㅇㄴ ㄱㅇㄷㅎㄴ 재다ㅎㄴ ㄱㅇㄱㅎㄷ, ㄴㅇㄴ] 목록ㅎㄷ
                ㄷㅇㄴ ㄱ ㄴㅎㄷㅎㄷ
            ㅎㅎㄴ
        ㅎ

        def _(
            execute: (int, int, int, int, list[list[int]], int, bytes)
                -> IO[tuple[int, int, int, int, bytes]],
            get_velocity: (int, int, int) -> tuple[int, int],
            read_table: (int, int) -> tuple[int, int, int] | None,
            move: (int, int, int) -> int,
        ) -> IO[int]:
            ㄱ(0)
            ㄱ(0)
            ㄱ(0)
            ㄴ(1)
            [
                목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ,
                목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ,
                목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ,
                목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ,
                목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ, 목록ㅎㄱ,
                목록ㅎㄱ, 목록ㅎㄱ, # TODO(dragonteros): pipe??
            ] 목록ㅎㄹㄹㄱ
            ㄱ(0)
            문자ㅎㄱ (ㄱ ㄴ <평 바꾸기 ㅂㅎㄷ>ㅎㄷ)ㅎㄴ
            def main_loop(
                x: int,
                y: int,
                x_speed: int,
                y_speed: int,
                stores: list[list[int]],
                selected_fd: int,
                stdin_buffer: bytes,
            ) -> IO[NoReturn]:
                ㄱㅇㄱ(x) ㄴㅇㄱ(y) ㄷㅇㄴㅎㄷ  # read_table(x, y)
                def _(
                    cell: tuple[int, int, int] | None
※              ) -> IO[tuple[int, int, list[list[int]], int, bytes]]:
aheui               if cell is None:
polyglot                [ㄷㅇㄴ, ㄹㅇㄴ, ㅁㅇㄴ, ㅂㅇㄴ, ㅅㅇㄴ] 목록ㅎㅂ 감싸ㅎㄴ 
starts              else:
here                    if choseong == HIEUH:
↓                          # NOTE: on_resolve expects an IO so wrap it
빈ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ값 ㅎㄱ 감싸ㅎㄴ
                            def quit(_: None) -> NoReturn:
                                종료코드
                                ㄱ(0) if not stores[selected_fd] else
                                    ㄱ(0) ㄴㄱ(-1) (ㅂㅇㄷ 븡등긍(21) ㄴㅎㄷ)ㅎㄷ
                                    ㅂㅇㄷ ㅁㅇㄷㅎㄴㅎㄴ  # stores[selected_fd]
                                (ㅂㅇㄷ ㅁㅇㄷㅎㄴ 재다ㅎㄴ ㄱ(0) ㄴㅎㄷ)ㅎㄷ
                                뜻밖ㅎㄷ 던지ㅎㄴ  # raise exit_code
                            하:기로 하다
                        else:
                            [ㄱ ㄱㅇㄱㅎㄴ, ㄷ ㄱㅇㄱㅎㄴ] 목록ㅎㄷ  # [cho, jong]
                            ㄴ ㄱㅇㄱㅎㄴ ㄷㅇㄴ ㄹㅇㄴ ㄴㅇㄷㅎㄹ  # get_velocity
                            [
믕ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅇㄴ,
                                ㅂㅇㄴ,
                            ㅅㅇㄴ] 목록ㅎㄹ
                            더ㅎㄹ
                            ㄱㅇㄷ ㅁㅂㅎㄴㅎㄴ
                        ㄱ ㄱㅇㄱㅎㄴ 듷듷긓(18) ㄴㅎㄷㅎㄷ
                    ㄱㅇㄱ 빈값ㅎㄱ ㄴㅎㄷㅎㄷ
                ㅎㅎㄴ

                def on_resolve(
                    new_x_speed, new_y_speed, new_stores, new_fd, new_buffer
                ):
                    ㄱㅇㄴ ㄴㅇㄴ ㄱㅇㄱ ㄴㅇㄱ ㄹㅇㄷㅎㅁ  # move(x, y, ...)
                        [ㄱㅇㄱ, ㄴㅇㄱ, ㄷㅇㄱ, ㄹㅇㄱ, ㅁㅇㄱ] 목록ㅎㅂ 더ㅎㄷ
                    (ㄴㅇ ㅁㅂㅎㄴ)ㅎㄴ
                ㅎ:ㅁㅂㅎㄴ:ㄱㄹㅎㄷ
            ㅎㅎㅈ

            def on_resolve():
                도달불가 뜻밖ㅎㄴ 던지ㅎㄴ  # should never happen
            ㅎ
            def on_reject(err):
                if ErrorCode:
                    ㄴ ㄱㅇㄱㅎㄴ 감싸ㅎㄴ
                else:
                    ㄱㅇㄱ 던지ㅎㄴ
                (ㄱㅇㄱ 재다ㅎㄴ ㄷ ㄴㅎㄷ) && (ㄱ ㄱㅇㄱㅎㄴ 종료코드 ㄴㅎㄷ) 곱ㅎㄷㅎㄷ
            ㅎ:ㄱㄹㅎㄹ
        ㅎㅎㅁ
    하:기로 하다
희ㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢㅢ
↑
aheui
polyglot
ends
here
※`,
        },
        {
          id: "3",
          name: "문자만드는평범코드드립니다.pbhhg",
          location: "./조각글/문자만드는평범코드드립니다.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: "import (ㅂ ㅂ ㅂㅎㄷ)  # bytes codec\nimport (조각글 평범숫자 ㅂㅎㄷ)\n\nㅀㄱ  # Input string!\n\n[ def pbhhg_code_that_generates_given_string(string):\n    encoded_bytes = ㄱㅇㄱ (ㄱ ㄴ ㄱㅇㄴㄱㅎㄷ)ㅎㄴ\n    table = [\n        ㄱㅂㄱㄱㄱㅁㄱㄷㄴㅅㄱㄱㄷㄱㄱㄱㄷㄱㅂㄱㄹㄱㄱㄴㄱㄱㄱㄴㅁㄷㅁㄴㅅㄴㅂㄱㄹㅅㅂㄴㄴㅅㅁㅁㄷㄱㄱㄱㄱㅁㄱ (ㄴ ㅁㄷㄱ ㄱㅇㄴㄱㅎㄷ)ㅎㄴ,\n        ㄱㅁㄱㄱㄱㄱㄷㄴㄱㄱㄱㄷㄹㄷㅁㄴㄱㅁㄱ (ㄴ ㄱㄴㄱ ㄱㅇㄴㄱㅎㄷ)ㅎㄴ,\n        ㄱㅁㄱㄱㄱㄷㅁㄴㄴㅅㅁㄹㅁㄷㅁㄴㄴㅅㅁㄱㄹㅁㄹㄷㄴㅅㅁㄹㄹㄷㅁㄴㄴㅂㄱㄱㄱㅁㄹㄷㄴㅅㄱㄷㄹㄷㅁㄴㄱㅁㄱㄱㄱㄱㄷㄴㄱㄱㅁㄱㄹㄷㅁㄴㄱㅁㄱㄱㄱㄱㅂㄴㄴㅅㄱㄱㄷㄱㄱㄱㄴㅅㅁㄱㄹㅅㄴㄷㄴㅅㅁㄱㄹㄷㅁㄴㅅㄴㅂㄱㄹㅅㅂㄴㄴㅅㅁㅁㄷㄱㄱㄱㅅㄴㅂㄱㄹㄱㅂㄴㄴㅅㄱㄱㄷㄱㄱㄱㅅㄴㅂㄱㄹㅁㄹㄷㄴㅅㄱㄷㄹㄷㅁㄴㄱ (ㄴ ㅅㅅㄱ ㄱㅇㄴㄱㅎㄷ)ㅎㄴ\n    ㅁㅀㄹ] (ㄱ ㄷ ㄱㅇㄴㄱㅎㄷ) ㅁㄷㅎㄷ\n    [ def subprocedure(encoded_bytes, table):\n        ㄱ ㄴㅇㄱ ㅎㄴ  # table[0]\n        ㄱㅇㄱ (ㄴ ㄱ ㄱㅇㄴㄱㅎㄷ)ㅎㄴ ㄴㅇㄴㄱㅎㄴ  # for string\n        ㄴ ㄴㅇㄱ ㅎㄴ  # table[1]\n        ㄱㅇㄱ ㅈㄷㅎㄴ ㄴㅇㄴㄱㅎㄴ  # for len(encoded_bytes)\n        ㄷ ㄴㅇㄱ ㅎㄴ  # table[2]\n        ㄷㅎㅂ\n    ㅎ]\n    ㅎㄷ ㄱㅅㅎㄴ # IO(subprocedure(encoded_bytes, table))\nㅎ]\n\nㄱㅀㄷ\n출력\nㄱㅀㄷ\n\nㅎㅎㄷ  # /import",
        },
        {
          id: "4",
          name: "빠른정렬.pbhhg",
          location: "./조각글/빠른정렬.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: "[ def quick_sort (arr):\n  # if len(arr) > 0:\n    ㄱ ㄱㅇㄱㅎㄴ  # pivot = arr[0]\n    ㄱㅇㄱ ㄴ ㅂㅈㅎㄷ  # slice = arr[1:]\n    [ def _(pivot, slice):\n      # [x for x in slice if x < pivot]\n      ㄴㅇㄱ (ㄱㅇㄱ ㄱㅇㄴ ㅈㅎㄷㅎ)ㅅㅂㅎㄷ\n      # [pivot]\n      ㄱㅇㄱ ㅁㄹㅎㄴ\n      # [x for x in slice if x >= pivot]\n      ㄴㅇㄱ (ㄱㅇㄱ ㄱㅇㄴ ㅈㅎㄷ ㅁㅎㄴㅎ)ㅅㅂㅎㄷ\n      ㄷㅎㄹ  # return [..]+[..]+[..]\n    ㅎ] ㅎㄷ  # return _(pivot, slice)\n  # else:\n    ㄱㅇㄱ  # return arr\n  (ㄱ ㄱㅇㄱ ㅈㄷㅎㄴ ㅈㅎㄷ)ㅎㄷ  # endif\nㅎ]",
        },
        {
          id: "5",
          name: "절댓값.pbhhg",
          location: "./조각글/절댓값.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: "ㄱ ㅇㄱ (ㄴㄱ ㄴ ㄱ ㅇㄱ ㄱ ㅈ ㅎㄷ ㅎㄷ) ㄱ ㅎㄷ ㅎ",
        },
        {
          id: "6",
          name: "평범숫자.pbhhg",
          location: "./조각글/평범숫자.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: "import (조각글 절댓값 ㅂㅎㄷ)\nimport (조각글 표 ㅂㅎㄷ)\n\n[ def encode_number(number):\n    ㄱㅇㄱ ㄱㅇㄴㄱ ㅎㄴ\n    ㅁㅈㅎㄱ\n    [ def to_oct(to_parse, parsed):\n        ㄴㅇㄱ\n\n        ㄱㅇㄱ ㄱㄴㄱ ㄴㄴㅎㄷ  # quotient..next to_parse\n        ㄱㅇㄱ ㄱㄴㄱ ㄴㅁㅎㄷ  # remainder\n        [ def _(remainder):\n            ㄴㅇㄴ (ㄱㅇㄱ ㄴㅇㄴㄱㅎㄴ) ㄷㅎㄷ  # next parsed\n        ㅎ]\n        ㅎㄴ\n        ㄱㅇㅎㄷ\n\n        (ㄱㅇㄱ ㄱ ㄶㄷ)ㅎㄷ\n    ㅎ]\n    ㅎㄷ\n\n    [ def encode_sign(encoded):\n        ㄱㅇㄱ\n\n        '' ㅁㅈㅎㄱ\n        'ㄱ' ㄴㅇㄴㄱㅎㄴ\n        is_negative = ㄱㅇㄴ ㄱ ㅈㅎㄷ\n        is_even_lengthed = ㄴㄱ ㄱㅇㄱ ㅈㄷㅎㄴ ㅅㅎㄷ ㄴ ㄶㄷ\n        ㄶㄷ\n        ㅎㄷ\n\n        ㄷㅎㄷ\n    ㅎ]\n    ㅎㄴ\nㅎ]\n\nㅎㅎㄷ  # /import",
        },
        {
          id: "7",
          name: "표.pbhhg",
          location: "./조각글/표.pbhhg",
          fileType: "File",
          isLeaf: true,
          data: "(ㅂ ㅂ ㅂㅎㄷ) ㄴㅅㅁㄱㄹㄱㅂㄴㄴㅅㅁㄹㄹㄷㅁㄴㄴㅈㅁㄱㄹㄷㄱㄷㄴㅅㄱㄴㅁㄷㅁㄴㅂㄱㅂㄱㄹㄱㄷㄷㄴㅅㄱ (ㄴ ㄱㄷㄱ ㄱㅇㄱㅎㄷ) (ㄱ ㄷ ㄱㅈㅎㄱ ㄱㅇㄱㅎㄹ) ㄴㄱㅎㄷㅎㄴ ㅎㅎㄴ",
        },
      ],
    },
    {
      id: "0",
      name: "낙서장.txt",
      location: "./낙서장.txt",
      fileType: "File",
      isLeaf: true,
      data: "난 지금도 가끔 얘기 해.\n누군간 여길 꿈꿨을까, 끝없는 헛된 후회 하나 했던걸까...\n",
    },
  ],
};

export default preimported;
