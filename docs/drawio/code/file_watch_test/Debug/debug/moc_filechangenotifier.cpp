/****************************************************************************
** Meta object code from reading C++ file 'filechangenotifier.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.9.6)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../filechangenotifier.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'filechangenotifier.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.9.6. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_FileChangeNotifier_t {
    QByteArrayData data[7];
    char stringdata0[67];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_FileChangeNotifier_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_FileChangeNotifier_t qt_meta_stringdata_FileChangeNotifier = {
    {
QT_MOC_LITERAL(0, 0, 18), // "FileChangeNotifier"
QT_MOC_LITERAL(1, 19, 11), // "fileChanged"
QT_MOC_LITERAL(2, 31, 0), // ""
QT_MOC_LITERAL(3, 32, 12), // "std::wstring"
QT_MOC_LITERAL(4, 45, 8), // "fileName"
QT_MOC_LITERAL(5, 54, 5), // "DWORD"
QT_MOC_LITERAL(6, 60, 6) // "action"

    },
    "FileChangeNotifier\0fileChanged\0\0"
    "std::wstring\0fileName\0DWORD\0action"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_FileChangeNotifier[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       1,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       1,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    2,   19,    2, 0x06 /* Public */,

 // signals: parameters
    QMetaType::Void, 0x80000000 | 3, 0x80000000 | 5,    4,    6,

       0        // eod
};

void FileChangeNotifier::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        FileChangeNotifier *_t = static_cast<FileChangeNotifier *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->fileChanged((*reinterpret_cast< const std::wstring(*)>(_a[1])),(*reinterpret_cast< DWORD(*)>(_a[2]))); break;
        default: ;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        {
            typedef void (FileChangeNotifier::*_t)(const std::wstring & , DWORD );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&FileChangeNotifier::fileChanged)) {
                *result = 0;
                return;
            }
        }
    }
}

const QMetaObject FileChangeNotifier::staticMetaObject = {
    { &QThread::staticMetaObject, qt_meta_stringdata_FileChangeNotifier.data,
      qt_meta_data_FileChangeNotifier,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *FileChangeNotifier::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *FileChangeNotifier::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_FileChangeNotifier.stringdata0))
        return static_cast<void*>(this);
    return QThread::qt_metacast(_clname);
}

int FileChangeNotifier::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QThread::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 1)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 1;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 1)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 1;
    }
    return _id;
}

// SIGNAL 0
void FileChangeNotifier::fileChanged(const std::wstring & _t1, DWORD _t2)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
